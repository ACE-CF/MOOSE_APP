// utils/drawTree.js
import * as d3 from "d3";
import { parseDataToTree } from '../utils/parseTree';

export function drawTree(data, containerId, setToastMessage, setShowToast, setPopupContent, setPopupPosition) {
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    d3.select(`#${containerId}`).selectAll("*").remove();

    let treeData = parseDataToTree(data);
    if (!treeData) {
        console.error("Tree data is empty or invalid.");
        return;
    }

    if (treeData.children && treeData.children.length > 0) {
        treeData = treeData.children[0];
    }

    const hierarchyData = d3.hierarchy(treeData);
    const nodeWidth = 160, nodeHeight = 50, nodeSpacing = 100;
    const treeLayout = d3.tree().nodeSize([nodeWidth + nodeSpacing, nodeHeight + nodeSpacing]);
    treeLayout(hierarchyData);

    const leaves = hierarchyData.leaves();
    const fixedMargin = 50;
    const fixedGap = 250;
    leaves.forEach((leaf, index) => {
        leaf.x = fixedMargin + index * fixedGap;
    });
    // 父节点居中
    hierarchyData.eachAfter(d => {
        if (d.children) {
            d.x = d.children.reduce((sum, child) => sum + child.x, 0) / d.children.length;
        }
    });
    // 垂直方向位置
    hierarchyData.each(d => {
        d.y = d.depth * 180;
    });


    // 获取所有节点的极值范围
    const allNodes = hierarchyData.descendants();
    const minX = d3.min(allNodes, d => d.x);
    const maxX = d3.max(allNodes, d => d.x);
    const maxY = d3.max(allNodes, d => d.y);

    const margin = 100;
    const svgWidth = maxX - minX + margin * 2;
    const svgHeight = maxY + margin * 2;

    // 创建 zoom 行为
    const zoom = d3.zoom()
        .scaleExtent([0.5, 4])  // 设置缩放范围
        .on("zoom", (event) => { // 在缩放时调整整个画布的 transform
            svg.attr("transform", event.transform); // event.transform 包含了缩放和位移信息
        });

    
    // const svg = d3.select(`#${containerId}`)
    //     .append("svg")
    //     .attr("width", svgWidth)
    //     .attr("height", svgHeight)
    //     .append("g")
    //     .attr("transform", `translate(${margin - minX}, ${margin})`);

    const svg = d3.select(`#${containerId}`)
                .append("svg")
                .attr("width", "100%")  // ✅ 设置为百分比，铺满容器宽
                .attr("height", "100%") // ✅ 设置为百分比，铺满容器高
                .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`) // ✅ 自适应内容尺寸
                .attr("preserveAspectRatio", "xMidYMid meet")    // ✅ 居中缩放
                .append("g")
                .attr("transform", `translate(${margin - minX}, ${margin})`);



    // 绑定 zoom 行为到 svg
    d3.select(`#${containerId} svg`).call(zoom);

    svg.selectAll(".link")
        .data(hierarchyData.links())
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .style("stroke", "#ccc")
        .style("stroke-width", 2);

    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "shadow").attr("height", "130%");
    filter.append("feDropShadow").attr("dx", "2").attr("dy", "2").attr("stdDeviation", "3");

    const nodes = svg.selectAll(".node")
        .data(hierarchyData.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .on("click", (event, d) => {
            navigator.clipboard.writeText(d.data.name).then(() => {
                setToastMessage(`✅ Copied: ${d.data.name}`);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            });
        })
        .on("mouseenter", (event, d) => {
            setPopupContent(d.data.name);
            setPopupPosition({ x: event.pageX, y: event.pageY });
        })
        .on("mouseleave", () => setPopupContent(null));

    nodes.append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("x", -nodeWidth / 2)
        .attr("y", -nodeHeight / 2)
        .attr("rx", 10)
        .attr("ry", 10)
        .style("fill", "#90CAF9")
        .style("stroke", "#1565C0")
        .style("stroke-width", 2)
        .style("filter", "url(#shadow)");

    nodes.append("text")
        .attr("dy", 5)
        .attr("x", 0)
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#fff")
        .text(d => truncateText(d.data.name, 15));
}
