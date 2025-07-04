// //右侧导航+内容
// import Link from "next/link";

// export default function CanvasWrapper({ children }) {
//     return (
//         <div className="w-2/3 ml-6 shadow-xl bg-white rounded-xl overflow-auto">
//             {/* 导航栏 */}
//             <div className="flex items-center justify-start space-x-6 border-b p-4">
//                 <Link href="/canvas/tree" className="text-blue-600 hover:underline">Tree View</Link>
//                 <Link href="/canvas/graph" className="text-blue-600 hover:underline">Rank View</Link>
//                 <Link href="/canvas/details" className="text-blue-600 hover:underline">Details</Link>
//             </div>
//             {/* 内容区域 */}
//             <div className="p-4" style={{ height: "calc(100vh - 120px)", overflow: "auto" }}>
//                 {children}
//             </div>
//         </div>
//     );
// }

// 右侧导航 + 内容
import Link from "next/link";
import { useRouter } from "next/router";

export default function CanvasWrapper({ children }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const navLinks = [
    { href: "/canvas/tree", label: "Tree View" },
    { href: "/canvas/graph", label: "Rank View" },
    // { href: "/canvas/details", label: "Details" },
    { href: "/canvas/tree2", label: "Tree View 2" },
    { href: "/canvas/graph2", label: "Rank View2" },

  ];

  return (
    <div className="w-2/3 ml-6 shadow-xl bg-white rounded-xl overflow-hidden">
      {/* 导航栏 */}
      <div className="flex items-center justify-start space-x-6 border-b p-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1 rounded-md transition-all duration-150 ${
              currentPath === link.href
                ? "bg-blue-100 text-blue-800 font-semibold"
                : "text-blue-600 hover:text-blue-800 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="p-4" style={{ height: "calc(100vh - 120px)", overflow: "auto" }}>
        {children}
      </div>
    </div>
  );
}
