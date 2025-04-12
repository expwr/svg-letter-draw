import React from "react";
var Draw = function (_a) {
    var _b = _a.title, title = _b === void 0 ? "Default Title" : _b, _c = _a.content, content = _c === void 0 ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." : _c;
    return (React.createElement("div", { style: { border: "1px solid #ccc", padding: "1rem", borderRadius: "4px" } },
        React.createElement("h2", null, title),
        React.createElement("p", null, content)));
};
export default Draw;
