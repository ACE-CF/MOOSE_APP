// utils/parseTree.js

/**
 * 将后端返回的数据结构解析为 D3.js 可识别的树形结构
 * @param {Object} data - 后端返回的 hypothesis 数据
 * @returns {Object|null} - D3 使用的树结构对象
 */
// utils/parseTree.js


export function parseDataToTree(data) {
    if (!data) return null;

    const root = { name: "Research Question", children: [] };

    Object.entries(data).forEach(([question, inspirationData]) => {
        const questionNode = { name: question, children: [] };

        Object.entries(inspirationData).forEach(([coreTitle, mutationCollection]) => {
            const inspirationNode = { name: coreTitle, children: [] };

            if (mutationCollection.recom) {
                if (mutationCollection.recom && mutationCollection.recom.length > 0) {
                    const lastMatched = mutationCollection.recom[mutationCollection.recom.length - 1];
                    if (Array.isArray(lastMatched)) {
                        const Hypothesis_incom = lastMatched[0];
                        if (typeof Hypothesis_incom === 'string') {
                            const incomHypNode = { name: Hypothesis_incom, children: [] };

                            if (mutationCollection.inter_recom_1) {
                                Object.entries(mutationCollection.inter_recom_1).forEach(([mutationId, coreMap]) => {
                                    Object.entries(coreMap).forEach(([coreInspTitleX, hypList]) => {
                                        if (Array.isArray(hypList) && hypList.length > 0) {
                                            const finalHyp = hypList[hypList.length - 1];
                                            if (Array.isArray(finalHyp) && typeof finalHyp[0] === 'string') {
                                                const hypName = finalHyp[0];
                                                const interRecom1Node = { name: `${coreInspTitleX}: ${hypName}`, children: [] };

                                                // 插入 inter_recom_2
                                                if (mutationCollection.inter_recom_2) {
                                                    Object.entries(mutationCollection.inter_recom_2).forEach(([fullKey, hypList2]) => {
                                                        const firstSep = fullKey.indexOf(";");
                                                        const lastSep = fullKey.lastIndexOf(";");
                                                        if (firstSep !== -1 && lastSep !== -1 && lastSep > firstSep) {
                                                            const extractedHypName = fullKey.substring(firstSep + 1, lastSep);
                                                            // console.log(extractedHypName)
                                                            if (extractedHypName === coreInspTitleX) {
                                                                // 添加 inter_recom_2 的内容
                                                                Object.entries(hypList2).forEach(([coreInspTitle2, hypListArray2]) => {
                                                                    // console.log("2+")
                                                                    if (Array.isArray(hypListArray2) && hypListArray2.length > 0) {
                                                                        const finalHyp2 = hypListArray2[hypListArray2.length - 1];
                                                                        if (Array.isArray(finalHyp2) && typeof finalHyp2[0] === 'string') {
                                                                            const hyp2Name = finalHyp2[0];
                                                                            interRecom1Node.children.push({
                                                                                name: `${coreInspTitle2}: ${hyp2Name}`
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                    
                                                }

                                                // 把 inter_recom_1 节点加入 recom 层
                                                incomHypNode.children.push(interRecom1Node);

                                            }
                                        }
                                    });
                                });
                            }
                            inspirationNode.children.push(incomHypNode);
                        } 
                    } 
                }
            
            }

            questionNode.children.push(inspirationNode);
        });

        root.children.push(questionNode);
    });

    return root;
}
