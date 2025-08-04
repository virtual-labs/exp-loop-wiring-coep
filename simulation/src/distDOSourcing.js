var timerMasterJson = {};
var resultJson = {};
var mimicCount4 = 0;

function Diagram42() {
    $("#startBtn3").prop("hidden", false);
    $("#Header").html("<center><span>DISTILATION DO SOURCING</span></center>");
    
    $("#startBtn,#startBtn2").prop("hidden",true);
    $("#startBtn1").prop("hidden",true);
    $("#counter").prop("hidden",false);
    seconds = 0;
    doCnt++;
    
    const virtualWidth = 700;
    const virtualHeight = 396;
    const paper = Raphael("diagram", "100%", "100%");
    paper.setViewBox(0, 0, virtualWidth, virtualHeight, true);
    paper.canvas.setAttribute("preserveAspectRatio", "xMidYMid meet");

    let placedElements = [];
    let connections = [];
    let selectedPort = null;

    const allPorts = [];
     
     var wrongCnt = 0;
     
    const x = 150, y = 100;
    
     paper.image("images/f0.png", x + 229.5, y - 74, 40, 30);
    paper.image("images/fuse.png", x + 200, y - 50, 100, 250);
    paper.image("images/posNeg.png", x + 298, y - 92, 40, 30);
    
    paper.image("images/labelPowerSupply.png", x + 340, y - 90, 130, 30);
    paper.image("images/DOLabel.png", x-30, y - 80, 23, 20);
    
//    paper.text(x+396,y-100," : 24V DC Power Supply").attr({'stroke' : '#5c696e' , "font-size":"14px"});
//    paper.text(x+396,y-84,"FU : Fuse").attr({'stroke' : '#5c696e' , "font-size":"14px"});
//    
//    paper.text(x-18,y-70,"DO").attr({'stroke' : '#5c696e' , "font-size":"14px"});
    
    const dropZones = [
        { x: x + 370, y: y - 35, width: 45, height: 42, type: "SV", zoneId: "LSH1", occupied: false },
        { x: x + 370, y: y + 25, width: 45, height: 42, type: "SV", zoneId: "LSH2", occupied: false },
        { x: x + 370, y: y + 85, width: 45, height: 42, type: "SV", zoneId: "LSH3", occupied: false },
        { x: x + 370, y: y + 145, width: 45, height: 42, type: "SV", zoneId: "LSH4", occupied: false },
        { x: x + 60, y: y - 100, width: 45, height: 42, type: "POSNEG", zoneId: "POSNEG1", occupied: false },
        { x: x -70, y: y -60, width: 100, height: 255, type: "CARD1", zoneId: "CARD11", occupied: false } // For this I want drop on this block only only for this 
    ];

    dropZones.forEach(zone => {
        paper.rect(zone.x, zone.y, zone.width, zone.height).attr({
            fill: "rgba(0,0,0,0.1)",
            stroke: "#8f8d8d",
            "stroke-width": 0.3
        });
    });

    
    const portConfigurations = {
        LSH: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
        SV: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
         SV1: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
        LI: [
            { name: "top", dx: 0, dy: 4 },
            { name: "bottom", dx: 0, dy: 12 }
        ],
        TSL: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
        TSH: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
        TSHH: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ]
        ,TSLL: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
        PSHH: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ]
        ,PSLL: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
         LSHH: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ]
        ,LSLL: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
        FSHH: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ]
        ,FSLL: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
        FSH: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ]
        ,FSL: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
        PSL: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
        POSNEG: [
            { name: "right", dx: 0, dy: 20 },
            { name: "left", dx: 45, dy: 20 }
        ],
        NEGPOS: [
            { name: "right", dx: 0, dy: 20 },
            { name: "left", dx: 45, dy: 20 }
        ],
        FT: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
//        { x: x -70, y: y -60, width: 100, height: 255, type: "CARD", zoneId: "CARD1", occupied: false }
        CARD:[
            { name: "one", dx: 86, dy: 23 },
            { name: "two", dx: 86, dy: 50 },
            { name: "three", dx: 86, dy: 76 },
            { name: "four", dx: 85.5, dy: 101.5 }, // this overlaps
            { name: "five", dx: 85.3, dy: 127 }// this overlaps with above connection with static port
        ],
        CARD1:[
            { name: "one", dx: 86, dy: 23 },
            { name: "two", dx: 86, dy: 50 },
            { name: "three", dx: 86, dy: 76 },
            { name: "four", dx: 85.5, dy: 101.5 }, // this overlaps
            { name: "five", dx: 85.3, dy: 127 }// this overlaps with above connection with static port
        ],
         FY: [
            { name: "top", dx: 0, dy: 17 },
            { name: "bottom", dx: 0, dy: 26 }
        ],
          CARDA:[
            { name: "zeroPosRight", dx: 100, dy: 16 },
            { name: "zeroPosLeft", dx: 49, dy: 16 },
            { name: "zeroNegRight", dx: 100, dy: 46 },
            { name: "zeroNegLeft", dx: 49, dy: 46 },
            { name: "onePosRight", dx: 100, dy: 76 },
            { name: "onePosLeft", dx: 49, dy: 76 },
            { name: "oneNegRight", dx: 100, dy: 107.2 },
            { name: "oneNegLeft", dx: 49, dy: 107.2 },
             { name: "twoPosRight", dx: 100, dy: 140 },
            { name: "twoPosLeft", dx: 49, dy: 140},
            { name: "twoNegRight", dx: 100, dy: 172 },
            { name: "twoNegLeft", dx: 49, dy: 172 },
            
            { name: "threePosRight", dx: 100, dy: 203 },
            { name: "threePosLeft", dx: 49, dy: 203},
            { name: "threeNegRight", dx: 100, dy: 237 },
            { name: "threeNegLeft", dx: 49, dy: 237 },

        ]
    };
  

    function handlePortClick(port) {
	
	if (!port) return; 
	
    if (selectedPort === null) {
        selectedPort = port;
        port.attr({ fill: "#e67e22" });
        return;
    }

    if (selectedPort === port) {
        port.attr({ fill: "#3498db" });
        selectedPort = null;
        return;
    }

    const from = selectedPort;
    const to = port;

    const fromName = from.data("portName");
    const toName = to.data("portName");
    const fromType = from.data("type");
    const toType = to.data("type");
    const fromZone = from.data("zoneId");
    const toZone = to.data("zoneId");

    const fromX = parseFloat(from.attr("cx")) || 0;
const fromY = parseFloat(from.attr("cy")) || 0;
const toX = parseFloat(to.attr("cx")) || 0;
const toY = parseFloat(to.attr("cy")) || 0;


    const staticSpecialTypes = ["I1P", "I2P", "I3P","I5P", "I6P", "I7P"];

    const requirementsByZone = {
    "I3P2": [
        { from: { type: "I3P", port: "top" }, to: { type: "I2P", port: "top" } }
    ],
    "I2P2": [
        { from: { type: "I2P", port: "top" }, to: { type: "I1P", port: "top" } }
    ],
    "I1P2": [
        { from: { type: "I1P", port: "top" }, to: { type: "POSNEGP", port: "bottom" } }
    ],
    "I6P2": [
            { from: { type: "I6P", port: "bottom" }, to: { type: "I5P", port: "bottom" } }
        ],
        "I7P2": [
            { from: { type: "I7P", port: "bottom" }, to: { type: "I6P", port: "bottom" } }
        ],
        "I5P2": [
            { from: { type: "I5P", port: "bottom" }, to: { type: "POSNEGP", port: "top" } }
        ]
};

    function isValidConnection(fromType, fromName, toType, toName, fromZone, toZone) {
        const zones = [fromZone, toZone];
        for (const zone of zones) {
            const reqs = requirementsByZone[zone];
            if (!reqs) continue;

            for (const req of reqs) {
                const matchForward =
                    req.from.type === fromType && req.from.port === fromName &&
                    req.to.type === toType && req.to.port === toName;
                const matchReverse =
                    req.from.type === toType && req.from.port === toName &&
                    req.to.type === fromType && req.to.port === fromName;
                if (matchForward || matchReverse) {
                    return true;
                }
            }
        }
        return false;
    }

     let path = "";

// CARD/CARD1.three <-> I1P.top
if (
  ((fromName === "three" && ["CARD", "CARD1"].includes(from.data("type")) && to.data("type") === "I1P" && toName === "top") ||
   (toName === "three" && ["CARD", "CARD1"].includes(to.data("type")) && from.data("type") === "I1P" && fromName === "top"))
) {
  const isFromCard = ["CARD", "CARD1"].includes(from.data("type"));
  const startX = isFromCard ? fromX : toX;
  const startY = isFromCard ? fromY : toY;
  const endX = isFromCard ? toX : fromX;
  const endY = isFromCard ? toY : fromY;

  const verticalDistance = Math.abs(startY - endY);
  const jitter = Math.random() * 10;
  const horizontalOffset = 85 + (verticalDistance / 4) + jitter;
  const offsetX = startX < endX ? startX + horizontalOffset : startX - horizontalOffset;

  path = `M${startX},${startY}
          L${offsetX},${startY}
          L${offsetX},${endY}
          L${endX},${endY}`;
}

// CARD/CARD1.four <-> I2P.top
else if (
  ((fromName === "four" && ["CARD", "CARD1"].includes(from.data("type")) && to.data("type") === "I2P" && toName === "top") ||
   (toName === "four" && ["CARD", "CARD1"].includes(to.data("type")) && from.data("type") === "I2P" && fromName === "top"))
) {
  const isFromCard = ["CARD", "CARD1"].includes(from.data("type"));
  const startX = isFromCard ? fromX : toX;
  const startY = isFromCard ? fromY : toY;
  const endX = isFromCard ? toX : fromX;
  const endY = isFromCard ? toY : fromY;

  const horizontalOffset = 80;
  const offsetX = startX < endX ? startX + horizontalOffset : startX - horizontalOffset;

  path = `M${startX},${startY}
          L${offsetX},${startY}
          L${offsetX},${endY}
          L${endX},${endY}`;
}

// CARD/CARD1.five <-> I3P.top
else if (
  ((fromName === "five" && ["CARD", "CARD1"].includes(from.data("type")) && to.data("type") === "I3P" && toName === "top") ||
   (toName === "five" && ["CARD", "CARD1"].includes(to.data("type")) && from.data("type") === "I3P" && fromName === "top"))
) {
  const isFromCard = ["CARD", "CARD1"].includes(from.data("type"));
  const startX = isFromCard ? fromX : toX;
  const startY = isFromCard ? fromY : toY;
  const endX = isFromCard ? toX : fromX;
  const endY = isFromCard ? toY : fromY;

  const horizontalOffset = 55;
  const offsetX = startX < endX ? startX + horizontalOffset : startX - horizontalOffset;

  path = `M${startX},${startY}
          L${offsetX},${startY}
          L${offsetX},${endY}
          L${endX},${endY}`;
}

// POSNEGP.top <-> I8P.top (curve from left)
else if (
  (fromType === "POSNEGP" && fromName === "top" && toType === "I8P" && toName === "top" &&
   fromZone === "POSNEG1" && toZone === "I8P2") ||
  (fromType === "I8P" && fromName === "top" && toType === "POSNEGP" && toName === "top" &&
   fromZone === "I8P2" && toZone === "POSNEG1")
) {
  const isFromPosneg = fromType === "POSNEGP";
  const startX = isFromPosneg ? fromX : toX;
  const startY = isFromPosneg ? fromY : toY;
  const endX = isFromPosneg ? toX : fromX;
  const endY = isFromPosneg ? toY : fromY;

  const curveOffsetX = 60;

  path = `M${startX},${startY}
          C${startX - curveOffsetX},${startY}
           ${endX - curveOffsetX},${endY}
           ${endX},${endY}`;
}

// Static type validation with curved fallback
else if (
  staticSpecialTypes.includes(fromType) || staticSpecialTypes.includes(toType)
) {
  const valid = isValidConnection(fromType, fromName, toType, toName, fromZone, toZone);

  if (valid) {
    const curveOffsetX = 60;
    const ctrlX1 = fromX - curveOffsetX;
    const ctrlY1 = fromY;
    const ctrlX2 = toX - curveOffsetX;
    const ctrlY2 = toY;
    path = `M${fromX},${fromY} C${ctrlX1},${ctrlY1} ${ctrlX2},${ctrlY2} ${toX},${toY}`;
  } else {
    const midX = (fromX + toX) / 2;
    path = `M${fromX},${fromY}
            L${midX},${fromY}
            L${midX},${toY}
            L${toX},${toY}`;
  }
}

// Default elbow path
else {
  const midX = (fromX + toX) / 2;
  path = `M${fromX},${fromY}
          L${midX},${fromY}
          L${midX},${toY}
          L${toX},${toY}`;
}



    const line = paper.path(path).attr({
        stroke: "#494a4a",
        "stroke-width": 2.5,
        cursor: "pointer"
    });

    line.node.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        showContextMenu(e.clientX, e.clientY, () => {
            connections = connections.filter(conn => {
                if (conn.line === line) {
                    conn.line.remove();
                    return false;
                }
                return true;
            });
        });
    });

    connections.push({
        line,
        from,
        to,
        fromComponentId: from.data("componentId"),
        toComponentId: to.data("componentId")
    });

    selectedPort.attr({ fill: "#3498db" });
    selectedPort = null;
}


    
    
    function getDropZone(x, y, elementWidth, elementHeight, type) {
    return dropZones.find(zone => {
        if (type === "CARD1") {
            // Enforce drop only inside CARD1 and within bounds
            return (
                zone.zoneId === "CARD11" &&
                x >= zone.x &&
                y >= zone.y &&
                x + elementWidth <= zone.x + zone.width &&
                y + elementHeight <= zone.y + zone.height &&
                !zone.occupied
            );
        } else {
            // Normal drop logic
            return (
                x >= zone.x &&
                y >= zone.y &&
                x <= zone.x + zone.width &&
                y <= zone.y + zone.height &&
                !zone.occupied
            );
        }
    });
}

    

      function showContextMenu(x, y, onDelete) {
    // Remove any existing menu
    const oldMenu = document.getElementById("customContextMenu");
    if (oldMenu) oldMenu.remove();

    // Create the new menu
    const menu = document.createElement("div");
    menu.id = "customContextMenu";
    menu.style.position = "absolute";
    menu.style.top = `${y}px`;
    menu.style.left = `${x}px`;
    menu.style.background = "#fff";
    menu.style.border = "1px solid #ccc";
    menu.style.padding = "5px 10px";
    menu.style.zIndex = 1000;
    menu.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    menu.style.cursor = "pointer";
    menu.innerText = "Delete";

    menu.addEventListener("click", () => {
        onDelete();
        menu.remove();
    });

    document.body.appendChild(menu);

    // Remove menu on outside click
    document.addEventListener("click", () => {
        if (menu) menu.remove();
    }, { once: true });
}



    function addStaticPort(paper, cx, cy, portName, componentId, type, zoneId) {
        const port = paper.circle(cx, cy, 3).attr({
            fill: "#3498db",
            stroke: "#2c3e50",
            cursor: "pointer"
        });
        port.data("portName", portName);
        port.data("componentId", componentId);
        port.data("type", type);
        port.data("zoneId", zoneId);
        port.click(() => handlePortClick(port));
        port.node.setAttribute("data-component-id", componentId);
        port.node.setAttribute("data-zone-id", zoneId);
        allPorts.push(port);
        return port;
    }

    // Add static ports
    addStaticPort(paper, x + 298, y - 30, "top", "static-1", "LSHSP1", "LSH1");
    addStaticPort(paper, x + 273, y, "bottom", "static-2", "LSHSP2", "LSH1");
    addStaticPort(paper, x + 298, y + 28, "top", "static-3", "LSHS2P2", "LSH2");
    addStaticPort(paper, x + 273, y + 60, "bottom", "static-4", "LSHS2P3", "LSH2");
    addStaticPort(paper, x + 299, y + 88, "top", "static-5", "LSHS3P1", "LSH3");
    addStaticPort(paper, x + 273, y + 121, "bottom", "static-6", "LSHS3P2", "LSH3");
    addStaticPort(paper, x + 298, y + 148, "top", "static-7", "LSHS4P1", "LSH4");
    addStaticPort(paper, x + 273, y + 181, "bottom", "static-8", "LSHS4P2", "LSH4");
    addStaticPort(paper, x + 226, y, "top", "static-9", "POSNEGP", "POSNEG1");    // this is that point
    addStaticPort(paper, x + 201.9, y-30, "bottom", "static-10", "POSNEGP", "POSNEG2");    
    addStaticPort(paper, x + 201.9, y+27, "top", "static-11", "I1P", "I1P2");
    
    addStaticPort(paper, x + 202.5, y+87.3, "top", "static-12", "I2P", "I2P2");
    addStaticPort(paper, x + 201.9, y+147, "top", "static-14", "I3P", "I3P2");
    
    addStaticPort(paper, x + 226, y+59, "bottom", "static-15", "I5P", "I5P2");
    addStaticPort(paper, x + 226.2, y+120, "bottom", "static-16", "I6P", "I6P2");
    addStaticPort(paper, x + 226.2, y+180, "bottom", "static-17", "I7P", "I7P2");
    
    addStaticPort(paper, x + 227.4, y-60, "top", "static-18", "I8P", "I8P2");
    
    function getPortConfiguration(type, subtype, imgSrc) {
    // Fallback to imgSrc detection if subtype is not explicitly passed
    if (!subtype && imgSrc.toLowerCase().includes("solenoid")) {
        subtype = "solenoid";
    }

    if (type === "SV" && subtype === "solenoid") {
        return portConfigurations["LI"];
    }

    return portConfigurations[type] || [];
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
//    console.log("Dhanashree");
    let dropPoint = getSVGCoordinates(e);
    let validDrop = dropZones.find(zone => {
        let xCheck = Math.abs(dropPoint.x - (zone.x + zone.width / 2)) < (zone.width / 2 + 30);
        let yCheck = Math.abs(dropPoint.y - (zone.y + zone.height / 2)) < (zone.height / 2 + 30);
        return xCheck && yCheck && !zone.occupied;
    });

    if (validDrop) {
        // ✅ Count existing AM.png components BEFORE dropping
        const amCountBefore = placedElements.filter(el =>
            el?.data && el.data("type") === "SV" && el.node?.getAttribute("href")?.toLowerCase().includes("am.png")
        ).length;

        if (imgSrc.toLowerCase().includes("am.png") && amCountBefore >= 1) {
//            alert("❌ Only one AM.png component is allowed.");

             Swal.fire({
					icon: 'error',
					title: 'Only one Automatic Switch (AM) may be selected',
					confirmButtonText: 'Try Again',
					customClass: {
						icon: 'custom-icon',
						popup: 'custom-popup',
						title: 'custom-title',
						confirmButton: 'custom-confirm-button',
						cancelButton: 'custom-cancel-button',
					}
				});

            return;
        }

        const uniqueId = `comp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        let imgElement = paper.image(imgSrc, validDrop.x, validDrop.y, validDrop.width, validDrop.height).attr({ cursor: "pointer" });

        imgElement.data("zoneId", validDrop.zoneId);
        imgElement.data("type", draggedType);
        imgElement.data("componentId", uniqueId);

//        const portOffsets = portConfigurations[draggedType] || [];

    const subtype = imgSrc.toLowerCase().includes("solenoid") ? "solenoid" : null;
           const portOffsets = getPortConfiguration(draggedType, subtype, imgSrc);

        const ports = portOffsets.map(offset => {
            const cx = validDrop.x + offset.dx;
            const cy = validDrop.y + offset.dy;
            const port = paper.circle(cx, cy, 3).attr({ fill: "#3498db", stroke: "#2c3e50", cursor: "pointer" });
            port.data("parent", imgElement);
            port.data("portName", offset.name);
            port.data("componentId", uniqueId);
            port.data("type", draggedType);
            port.data("zoneId", validDrop.zoneId);
            port.click(() => handlePortClick(port));
            allPorts.push(port);
            return port;
        });

        imgElement.node.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            showContextMenu(e.clientX, e.clientY, () => {
                ports.forEach(p => p.remove());
                removeConnectionsByComponentId(uniqueId);
                imgElement.remove();
                validDrop.occupied = false;
                placedElements = placedElements.filter(el => el !== imgElement);
            });
        });

        // Sample additional ports if needed (adjust as required)
         const i5p = addStaticPort(paper, x + 226, y+59, "bottom", "static-15", "I5P", "I5P2");
const i6p = addStaticPort(paper, x + 226.2, y+120, "bottom", "static-16", "I6P", "I6P2");
const i7p = addStaticPort(paper, x + 226.2, y+180, "bottom", "static-17", "I7P", "I7P2");

        placedElements.push(imgElement, i5p, i6p, i7p);
        validDrop.occupied = true;
    }
});


    function getSVGCoordinates(e) {
        let rect = paper.canvas.getBoundingClientRect();
        let scaleX = virtualWidth / rect.width;
        let scaleY = virtualHeight / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    function removeConnectionsByComponentId(id) {
        connections = connections.filter(conn => {
            if (conn.fromComponentId === id || conn.toComponentId === id) {
                conn.line.remove();
                return false;
            }
            return true;
        });
    }

    function getZoneByComponentId(id) {
        let el = placedElements.find(el => el.data("componentId") === id);
        if (el) return el.data("zoneId");

        for (const port of allPorts) {
            if (port.data("componentId") === id) {
                return port.data("zoneId");
            }
        }

        return null;
    }

  document.getElementById("startBtn3").addEventListener("click", () => {
	   mimicCount4++;
    const requirements = [
        {
            zoneId: "LSH1",
            requirements: [
                { from: { type: "SV", port: "top" }, to: { type: "LSHSP1", port: "top" } },
                { from: { type: "SV", port: "bottom" }, to: { type: "LSHSP2", port: "bottom" } }
            ]
        },
        {
            zoneId: "LSH2",
            requirements: [
                { from: { type: "SV", port: "top" }, to: { type: "LSHS2P2", port: "top" } },
                { from: { type: "SV", port: "bottom" }, to: { type: "LSHS2P3", port: "bottom" } }
            ]
        },
        {
            zoneId: "LSH3",
            requirements: [
                { from: { type: "SV", port: "top" }, to: { type: "LSHS3P1", port: "top" } },
                { from: { type: "SV", port: "bottom" }, to: { type: "LSHS3P2", port: "bottom" } }
            ]
        },
        {
            zoneId: "LSH4",
            requirements: [
                { from: { type: "SV", port: "top" }, to: { type: "LSHS4P1", port: "top" } },
                { from: { type: "SV", port: "bottom" }, to: { type: "LSHS4P2", port: "bottom" } }
            ]
        },
        {
            zoneId: "POSNEG1",
            requirements: [
               { from: { type: "POSNEG", port: "left" }, to: { type: "I8P", port: "top" }}
            ]
        },
        {
            zoneId: "CARD11",
            requirements: [
                { from: { type: "CARD1", port: "one" }, to: { type: "POSNEG", port: "right" } },
               { from: { type: "CARD1", port: "two" }, to: { type: "POSNEGP", port: "bottom" } },
                { from: { type: "CARD1", port: "three" }, to: { type: "I1P", port: "top" } },
                { from: { type: "CARD1", port: "four" }, to: { type: "I2P", port: "top" } },
                { from: { type: "CARD1", port: "five" }, to: { type: "I3P", port: "top" } }
            ]
        },
        {
            zoneId: "I6P2",
            requirements: [
                { from: { type: "I6P", port: "bottom" }, to: { type: "I5P", port: "bottom" } }
            ]
        },
        {
            zoneId: "I7P2",
            requirements: [
                { from: { type: "I7P", port: "bottom" }, to: { type: "I6P", port: "bottom" } }
            ]
        },
        {
            zoneId: "I5P2",
            requirements: [
               { from: { type: "I5P", port: "bottom" }, to: { type: "POSNEGP", port: "top" } }

            ]
        }
    ];
    
  const globalRequirements = [
        { from: { type: "POSNEGP", port: "top" }, to: { type: "I8P", port: "top" } }
    ];
    
    let allValid = true;

    for (const { zoneId, requirements: reqs } of requirements) {
        const zoneComponents = placedElements.filter(el => el.data("zoneId") === zoneId);
        if (zoneComponents.length === 0) {
            console.warn(`❌ Zone "${zoneId}" has no components`);
            allValid = false;
            continue;
        }

        const zoneComponentIds = zoneComponents.map(el => el.data("componentId"));

        for (const req of reqs) {
             const matched = connections.some(conn => {
    const from = conn.from.data();
    const to = conn.to.data();

    const match = (a, b) =>
        a.type.toLowerCase() === b.type.toLowerCase() &&
        a.portName.toLowerCase() === b.port.toLowerCase();

    const fromZoneId = conn.from.data("zoneId");
    const toZoneId = conn.to.data("zoneId");

    const fromComponentId = conn.fromComponentId;
    const toComponentId = conn.toComponentId;

    const isValidMatch =
        (match(from, req.from) && match(to, req.to) && fromZoneId === zoneId) ||
        (match(from, req.to) && match(to, req.from) && toZoneId === zoneId);

    return isValidMatch;
            });

            if (!matched) {
                console.warn(`❌ Unmatched requirement in zone "${zoneId}":`, req);
                allValid = false;
            }
        }
    }
    
    for (const req of globalRequirements) {
        const matched = connections.some(conn => {
            const from = conn.from.data();
            const to = conn.to.data();

            const match = (a, b) =>
                a.type.toLowerCase() === b.type.toLowerCase() &&
                a.portName.toLowerCase() === b.port.toLowerCase();

            return (
                (match(from, req.from) && match(to, req.to)) ||
                (match(from, req.to) && match(to, req.from))
            );
        });

        if (!matched) {
            console.warn(`❌ Missing global connection:`, req);
            allValid = false;
        }
    }
    
    
    console.log("🔎 Placed elements:", placedElements.map(el => ({
        id: el.data("componentId"),
        type: el.data("type"),
        zoneId: el.data("zoneId")
    })));

    console.log("🔌 Connections:", connections.map(conn => ({
        fromType: conn.from.data("type"),
        fromPort: conn.from.data("portName"),
        fromZone: getZoneByComponentId(conn.fromComponentId),
        toType: conn.to.data("type"),
        toPort: conn.to.data("portName"),
        toZone: getZoneByComponentId(conn.toComponentId)
    })));
       
        if(allValid){
//	  alert(" All required connections are correct! ");
          
          Swal.fire({
				icon: 'success',
				title: 'All elements are placed correctly!',
				confirmButtonText: 'OK',
				customClass: {
					icon: 'custom-icon',
					popup: 'custom-popup',
					title: 'custom-title',
					confirmButton: 'custom-confirm-button',
					cancelButton: 'custom-cancel-button',
				}
			});
          
        $("#startBtn3").prop("hidden",true);
        
         $("#diagram").html("");
         
         resultJson.demo2 = mimicCount4;
        console.log(resultJson);
        
        timerMasterJson.demo2 = $("#counter").text();
		console.log(timerMasterJson);
		seconds = 0;
		updateCounter();
	  
	  var htm = `<img src='images/distDOSourcing.png' class='img-fluid' 
                     style='border-style: double; border-color: black; display: block; margin: 10px auto; width: 80%;; height: 75%; '>`
                     
          $("#diagram").html(htm);
      
        
        if(finCnt>=4 && doCnt>=2){
			$("#result").prop("hidden",false);
			
			$("#subhookUpSelect1").prop("hidden",true);	    	
		 $("#subhookUpSelectLabel1").prop("hidden",true);
       
        $("#hookUpSelect").prop("hidden",true);
        $("#hookUpSelectLabel").prop("hidden",true);
        $("#counter").prop("hidden",true);
        
		}
       $("#counter").prop("hidden",true); 
	  if(doCnt<2){
		
		$("#subhookUpSelect1").prop("disabled",false);
		$("#hookUpSelect").prop("disabled",true);
	}else{
		 $("#subhookUpSelectLabel1").prop("hidden",true);
        $("#subhookUpSelect1").prop("hidden",true);
        $("#hookUpSelect").prop("disabled",false);
	}
	}else{
	 
	  if(wrongCnt<3){
//	  alert(" Missing or invalid connections ");
          Swal.fire({
					icon: 'error',
					title: 'Some elements are missing or misplaced!',
					confirmButtonText: 'Try Again',
					customClass: {
						icon: 'custom-icon',
						popup: 'custom-popup',
						title: 'custom-title',
						confirmButton: 'custom-confirm-button',
						cancelButton: 'custom-cancel-button',
					}
				});

	  }else{
//		alert("image");

         Swal.fire({
					title: 'Appropriate Connections',
					html: `<div>
                <img src='images/distDOSourcing.png' class='img-fluid' 
                     style='border-style: double; border-color: black; display: block; margin: 10px auto; width: 100%; max-width: 1200px;'>
           </div>`,
					width: '40%', // Increases the width of the modal
					confirmButtonText: 'Try Again',
					customClass: {
						icon: 'custom-icon',
						popup: 'custom-popup',
						title: 'custom-title',
						confirmButton: 'custom-confirm-button',
						cancelButton: 'custom-cancel-button',
					}
				});

	} 
	 wrongCnt++;
     }
       
//    alert(allValid ? "✅ All required connections are correct!" : "❌ Missing or invalid connections.");
});


}
