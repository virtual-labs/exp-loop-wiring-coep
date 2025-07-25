function Diagram() {
    $("#startBtn").prop("hidden", false);
    $("#Header").html("<center><span>CONNECTION</span></center>");

    const virtualWidth = 700;
    const virtualHeight = 396;

    const paper = Raphael("diagram", "100%", "100%");
    paper.setViewBox(0, 0, virtualWidth, virtualHeight, true);
    paper.canvas.setAttribute("preserveAspectRatio", "xMidYMid meet");

    let placedElements = [];
    let connections = [];
    let selectedPort = null;

    const dropZones = [
        { x: 250, y: 74, width: 50, height: 50, type: "LSH", occupied: false, allowMirror: false },
        { x: 340, y: 74, width: 50, height: 50, type: "FT", occupied: false, allowMirror: true }
    ];

    // Draw drop zones
    dropZones.forEach(zone => {
        paper.rect(zone.x, zone.y, zone.width, zone.height).attr({
            fill: "rgba(0, 0, 0, 0.1)",
            stroke: "#8f8d8d",
            "stroke-width": 0.3,
        });
    });

    const portConfigurations = {
        LSH: [
            { name: "top", dx: 18.5, dy: -5 },
            { name: "bottom", dx: 18.5, dy: 42 }
        ],
        FT: [
            { name: "top", dx: 18, dy: -5},
            { name: "bottom", dx: 18, dy: 42 }
        ]
    };

    const validConnections = [
        {
            from: { type: "LSH", port: "top" },
            to:   { type: "FT", port: "top" }
        },
        {
            from: { type: "LSH", port: "top" },
            to:   { type: "FT", port: "top" }
        }
    ];

    function getSVGCoordinates(e) {
        let svgRect = paper.canvas.getBoundingClientRect();
        let scaleX = virtualWidth / svgRect.width;
        let scaleY = virtualHeight / svgRect.height;
        return {
            x: (e.clientX - svgRect.left) * scaleX,
            y: (e.clientY - svgRect.top) * scaleY
        };
    }

    document.querySelectorAll(".component").forEach(component => {
        component.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("imgSrc", component.querySelector("img").src);
            e.dataTransfer.setData("type", component.getAttribute("data-type"));
        });
    });

    document.getElementById("diagram").addEventListener("dragover", (e) => e.preventDefault());

    document.getElementById("diagram").addEventListener("drop", (e) => {
        e.preventDefault();
        const imgSrc = e.dataTransfer.getData("imgSrc");
        const draggedType = e.dataTransfer.getData("type");

        let dropPoint = getSVGCoordinates(e);
        let validDrop = dropZones.find(zone => {
            let xThreshold = 30;
            let yThreshold = 30;
            let xCheck = Math.abs(dropPoint.x - (zone.x + zone.width / 2)) < (zone.width / 2 + xThreshold);
            let yCheck = Math.abs(dropPoint.y - (zone.y + zone.height / 2)) < (zone.height / 2 + yThreshold);
            return xCheck && yCheck && !zone.occupied;
        });

        if (validDrop) {
            let imgElement = paper.image(imgSrc, validDrop.x, validDrop.y, validDrop.width, validDrop.height)
                .attr({ cursor: "pointer" });

            const uniqueId = `comp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            imgElement.data("componentId", uniqueId);
            imgElement.data("type", draggedType);
            imgElement.data("mirrored", false);

            const portOffsets = portConfigurations[draggedType] || [];
            const ports = portOffsets.map(offset => {
                const cx = validDrop.x + offset.dx;
                const cy = validDrop.y + offset.dy;
                const port = paper.circle(cx, cy, 5).attr({ fill: "#3498db", stroke: "#2c3e50", cursor: "pointer" });
                port.data("parent", imgElement);
                port.data("portName", offset.name);
                port.data("componentId", uniqueId);
                return port;
            });

            ports.forEach(port => {
               port.click(() => {
    if (selectedPort === null) {
        selectedPort = port;
        port.attr({ fill: "#e67e22" });
    } else {
        if (selectedPort === port) {
            port.attr({ fill: "#3498db" });
            selectedPort = null;
            return;
        }

        // ROUTED CONNECTION LINE
			       const x1 = selectedPort.attrs.cx;
			const y1 = selectedPort.attrs.cy;
			const x2 = port.attrs.cx;
			const y2 = port.attrs.cy;
			
			const padding = 10;
			let path = "";
			
			// Check relative positions and route around components
			if (Math.abs(y1 - y2) < 20) {
			    const midY = Math.min(y1, y2) - padding;
			    path = `M${x1},${y1}L${x1},${midY}L${x2},${midY}L${x2},${y2}`;
			} else if (Math.abs(x1 - x2) < 20) {
			    const midX = Math.min(x1, x2) - padding;
			    path = `M${x1},${y1}L${midX},${y1}L${midX},${y2}L${x2},${y2}`;
			} else {
			    const midX = (x1 + x2) / 2;
			    path = `M${x1},${y1}L${midX},${y1}L${midX},${y2}L${x2},${y2}`;
			}
			
			const line = paper.path(path)
			    .attr({ stroke: "#494a4a", "stroke-width": 2.5, cursor: "pointer" });

        line.click(() => {
            connections = connections.filter(conn => {
                if (conn.line === line) {
                    conn.line.remove();
                    return false;
                }
                return true;
            });
        });

        connections.push({
            from: selectedPort,
            to: port,
            line,
            fromElement: selectedPort.data("parent"),
            toElement: port.data("parent"),
            fromComponentId: selectedPort.data("componentId"),
            toComponentId: port.data("componentId")
        });

        selectedPort.attr({ fill: "#3498db" });
        selectedPort = null;
    }
});

            });

            imgElement.click(() => {
                // Remove ports
                ports.forEach(p => p.remove());

                // Remove associated connections by ID
                const compId = imgElement.data("componentId");
                removeConnectionsByComponentId(compId);

                imgElement.remove();
                validDrop.occupied = false;
                placedElements = placedElements.filter(el => el !== imgElement);
            });

            placedElements.push(imgElement);
            validDrop.occupied = true;
        }
    });

    document.getElementById("startBtn").addEventListener("click", () => {
        if (connections.length === 0) {
            alert("No connections made.");
            return;
        }

        let allValid = true;

        connections.forEach(conn => {
            const fromType = conn.fromElement.data("type");
            const toType = conn.toElement.data("type");
            const fromPort = conn.from.data("portName");
            const toPort = conn.to.data("portName");

            const isValid = validConnections.some(rule =>
                rule.from.type === fromType &&
                rule.from.port === fromPort &&
                rule.to.type === toType &&
                rule.to.port === toPort
            );

            if (!isValid) allValid = false;
        });

        alert(allValid ? "✅ All connections valid!" : "❌ Invalid connections found.");
    });

    function removeConnectionsByComponentId(componentId) {
        connections = connections.filter(conn => {
            const isConnected =
                conn.fromComponentId === componentId ||
                conn.toComponentId === componentId;

            if (isConnected) {
                conn.line.remove();
            }

            return !isConnected;
        });
    }
}
