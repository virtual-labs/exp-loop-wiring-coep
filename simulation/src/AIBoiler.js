var resultJson = {};
var mimicCountAi = 0;
function aiBoiler() {
    $("#startBtn").prop("hidden", true);
    $("#Header").html("<center><span>BOILER AI</span></center>");
    
    $("#startBtnAI").prop("hidden",false);
    
    $("#hookUpSelect").prop("disabled",true)
    $("#counter").prop("hidden",false);
    seconds = 0;
    finCnt++;
    
  
    
    const virtualWidth = 700;
    const virtualHeight = 396;
    const paper = Raphael("diagram", "100%", "100%");
    paper.setViewBox(0, 0, virtualWidth, virtualHeight, true);
    paper.canvas.setAttribute("preserveAspectRatio", "xMidYMid meet");

    let placedElements = [];
    let connections = [];
    let selectedPort = null;

    const allPorts = [];
    var wrongCntAI = 0;
    
    const x = 150, y = 100;
//    paper.image("images/f0.png", x + 229.5, y - 74, 40, 30);
//    paper.image("images/fuse.png", x + 200, y - 50, 100, 250);
    paper.image("images/posNeg.png", x + 250, y - 112, 40, 30);
    paper.image("images/AILabel.png", x-28, y - 82, 20, 20);
    paper.image("images/labelBusbar.png", x + 290, y - 110, 150, 20);
    
    
//    paper.text(x+396,y-100," : 24V DC Power Supply Bus bar").attr({'stroke' : '#5c696e' , "font-size":"14px"});
//    paper.text(x+396,y-84,"FU : Fuse").attr({'stroke' : '#5c696e' , "font-size":"14px"});
    
//    paper.text(x-18,y-70,"AI").attr({'stroke' : '#5c696e' , "font-size":"14px"});
    
    const dropZones = [
        { x: x + 250, y: y - 35, width: 45, height: 42, type: "FT", zoneId: "LSH1", occupied: false },
        { x: x + 250, y: y + 25, width: 45, height: 42, type: "FT", zoneId: "LSH2", occupied: false },
        { x: x + 250, y: y + 85, width: 45, height: 42, type: "FT", zoneId: "LSH3", occupied: false },
        { x: x + 250, y: y + 145, width: 45, height: 42, type: "FT", zoneId: "LSH4", occupied: false },
        { x: x + 105, y: y - 100, width: 45, height: 42, type: "POSNEG", zoneId: "POSNEG1", occupied: false },
        { x: x -70, y: y -60, width: 100, height: 255, type: "CARDA", zoneId: "CARDA1", occupied: false } // For this I want drop on this block only only for this 
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
         FY: [
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

    const fromX = parseFloat(from.attr("cx")) || 0;
const fromY = parseFloat(from.attr("cy")) || 0;
const toX = parseFloat(to.attr("cx")) || 0;
const toY = parseFloat(to.attr("cy")) || 0;


    const fromType = from.data("type") || from.data("componentType");
    const toType = to.data("type") || to.data("componentType");
    const fromPort = from.data("portName") || from.data("portId");
    const toPort = to.data("portName") || to.data("portId");

    // Define all port pairs where arcs should be drawn (extend this as needed)
    const arcPortPairs = [
        ["threePosLeft", "twoPosLeft"],        
        ["twoPosLeft", "onePosLeft"],
        ["onePosLeft", "zeroPosLeft"],
        
         ["twoPosLeft", "threePosLeft"],        
        ["onePosLeft", "twoPosLeft"],
        ["zeroPosLeft", "onePosLeft"],
        
         ["threeNegLeft", "twoNegLeft"],        
        ["twoNegLeft", "oneNegLeft"],
        ["oneNegLeft", "zeroNegLeft"],
        
         ["twoNegLeft", "threeNegLeft"],        
        ["oneNegLeft", "twoNegLeft"],
        ["zeroNegLeft", "oneNegLeft"],
        
         ["zeroPosLeft", "zeroNegLeft"],
         ["zeroNegLeft", "zeroPosLeft"],
        
         ["onePosLeft", "oneNegLeft"],
         ["oneNegLeft", "onePosLeft"],
         
         ["twoPosLeft", "twoNegLeft"],
         ["twoNegLeft", "twoPosLeft"],
         
         ["threePosLeft", "threeNegLeft"],
         ["threeNegLeft", "threePosLeft"],
         
         ["zeroNegLeft", "onePosLeft"],
         ["onePosLeft", "zeroNegLeft"],
         
          ["oneNegLeft", "twoPosLeft"],
         ["twoPosLeft", "oneNegLeft"],
         
         ["twoNegLeft", "threePosLeft"],
         ["threePosLeft", "twoNegLeft"],
         
    ];

    // Check if from->to matches any arc pair (including reverse if needed)
    const isArcConnection = 
        fromType === "CARDA" && toType === "CARDA" && 
        arcPortPairs.some(([start, end]) => fromPort === start && toPort === end);

    let path;
    
        const isSpecialElbowConnection =
    (fromType === "POSNEG" && fromPort === "left" && toType === "one" && toPort === "top") ||
    (toType === "POSNEG" && toPort === "left" && fromType === "one" && fromPort === "top");

    if (isSpecialElbowConnection) {
       
       if (fromType === "POSNEG") {
        
        path = `
        M${fromX},${fromY}
        L${toX},${fromY}
        L${toX},${toY}
    `;
    } else {
        
        path = `
            M${fromX},${fromY}
            L${fromX},${toY}
            L${toX},${toY}
        `;
    }
        
    } else if (isArcConnection) {
        const dx = toX - fromX;
        const dy = toY - fromY;
        const dr = Math.sqrt(dx * dx + dy * dy) * 0.6;

        const sweepFlag = fromY < toY ? 0 : 1;

        path = `
            M${fromX},${fromY}
            A${dr},${dr} 0 0,${sweepFlag} ${toX},${toY}
        `;
    } else {
        const midX = (fromX + toX) / 2;
        path = `
            M${fromX},${fromY}
            L${midX},${fromY}
            L${midX},${toY}
            L${toX},${toY}
        `;
    }


    const line = paper.path(path).attr({
        stroke: "#494a4a",
        "stroke-width": 2.5,
        fill: "none",
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

        let dropPoint = getSVGCoordinates(e);
        let validDrop = dropZones.find(zone => {
            let xCheck = Math.abs(dropPoint.x - (zone.x + zone.width / 2)) < (zone.width / 2 + 30);
            let yCheck = Math.abs(dropPoint.y - (zone.y + zone.height / 2)) < (zone.height / 2 + 30);
            return xCheck && yCheck && !zone.occupied;
        });

        if (validDrop) {
	
	     const amCountBefore = placedElements.filter(el =>
            el?.data && el.data("type") === "LSH" && el.node?.getAttribute("href")?.toLowerCase().includes("am.png")
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

//            const portOffsets = portConfigurations[draggedType] || [];
           
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


            placedElements.push(imgElement);
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

// { name: "top", dx: 0, dy: 17 },
   
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
   
    addStaticPort(paper, x + 190, y - 18, "top", "static-1", "one", "one1");
    addStaticPort(paper, x + 190, y +42, "top", "static-2", "two", "two2");
    addStaticPort(paper, x + 190, y +102, "top", "static-3", "three", "three3");
    addStaticPort(paper, x + 190, y +162, "top", "static-4", "four", "four4");
   
  document.getElementById("startBtnAI").addEventListener("click", () => {
	  mimicCountAi++;
    const requirements = [
        {
            zoneId: "CARDA1",
            requirements: [
                {
                    from: { type: "CARDA", port: "zeroPosRight" },
                    to: { type: "POSNEG", port: "right" }
                },
                {
                    from: { type: "CARDA", port: "threePosLeft" },
                    to: { type: "CARDA", port: "twoPosLeft" }
                },
                {
                    from: { type: "CARDA", port: "twoPosLeft" },
                    to: { type: "CARDA", port: "onePosLeft" }
                },
                {
                    from: { type: "CARDA", port: "onePosLeft" },
                    to: { type: "CARDA", port: "zeroPosLeft" }
                }
            ]
        },
        {
            zoneId: "LSH1",
            requirements: [
                {
                    from: { type: "FT", port: "top" },
                    to: { type: "one", port: "top" }
                },
                {
                    from: { type: "FT", port: "bottom" },
                    to: { type: "CARDA", port: "zeroNegRight" }
                }
            ]
        },
        {
            zoneId: "LSH2",
            requirements: [
	            {
                    from: { type: "FT", port: "top" },
                    to: { type: "two", port: "top" }
                },
                {
                    from: { type: "FT", port: "bottom" },
                    to: { type: "CARDA", port: "oneNegRight" }
                }
              
            ]
        },
        {
            zoneId: "LSH3",
            requirements: [
	            {
                    from: { type: "FT", port: "top" },
                    to: { type: "three", port: "top" }
                },
                {
                    from: { type: "FT", port: "bottom" },
                    to: { type: "CARDA", port: "twoNegRight" }
                },
              
            ]
        },
        {
            zoneId: "LSH4",
            requirements: [
	             {
                    from: { type: "FT", port: "top" },
                    to: { type: "four", port: "top" }
                },
                {
                    from: { type: "FT", port: "bottom" },
                    to: { type: "CARDA", port: "threeNegRight" }
                },
              
            ]
        },
         {
            zoneId: "POSNEG1",
            requirements: [
                {
                    from: { type: "POSNEG", port: "left" },
                    to: { type: "one", port: "top" }
                }, // this connection instead of circuit like first vertical and then horizontal
              
            ]
        },
        {
            zoneId: "two2",
            requirements: [
                {
                    from: { type: "two", port: "top" },
                    to: { type: "one", port: "top" }
                }, 
              
            ]
        },
         {
            zoneId: "three3",
            requirements: [
                {
                    from: { type: "three", port: "top" },
                    to: { type: "two", port: "top" }
                }, 
              
            ]
        },
         {
            zoneId: "four4",
            requirements: [
                {
                    from: { type: "four", port: "top" },
                    to: { type: "three", port: "top" }
                }, 
              
            ]
        },
        
    ];
     
     
    
     
      console.log("🔌 Connections:", connections.map(conn => ({
        fromType: conn.from.data("type"),
        fromPort: conn.from.data("portName"),
        fromZone: getZoneByComponentId(conn.fromComponentId),
        toType: conn.to.data("type"),
        toPort: conn.to.data("portName"),
        toZone: getZoneByComponentId(conn.toComponentId)
    })));
     
    let allValid = true;

    for (const { zoneId, requirements: reqs } of requirements) {
        const zonePorts = allPorts.filter(port => port.data("zoneId") === zoneId);

        if (zonePorts.length === 0) {
            console.warn(`❌ No ports found for zone: ${zoneId}`);
            allValid = false;
            continue;
        }

        for (const req of reqs) {
            const matched = connections.some(conn => {
                const from = conn.from.data();
                const to = conn.to.data();

                const match = (a, b) =>
                    a.type === b.type &&
                    a.portName === b.port;

                const sameZoneMatch =
                    (match(from, req.from) && match(to, req.to)) ||
                    (match(from, req.to) && match(to, req.from));

                return sameZoneMatch;
            });

            if (!matched) {
                console.warn(`❌ Requirement not satisfied in zone ${zoneId}`, req);
                allValid = false;
            }
        }
    }

    if (allValid) {
	
	
	
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
			
			 if(finCnt>=4){
			$("#result").prop("hidden",false);
			$("#hookUpSelect").prop("hidden",true);
			$("#hookUpSelectLabel").prop("hidden",true);
			 $("#counter").prop("hidden",true);
		}	
			
	  $("#startBtnAI").prop("hidden",true);
	  $("#hookUpSelect").prop("disabled",false);	
	 
	  $("#diagram").html("");
	  
	  resultJson.AiBoiler = mimicCountAi;
        console.log(resultJson);
        
        timerMasterJson.AiBoiler = $("#counter").text();
				console.log(timerMasterJson);
				seconds = 0;
				updateCounter();
        
	  var htm = `<img src='images/AIDiagram.png' class='img-fluid' 
                     style='border-style: double; border-color: black; display: block; margin: 10px auto; width: 80%;; height: 75%; '>`
                     
          $("#diagram").html(htm);           
			$("#counter").prop("hidden",true);
    } else {
	   if(wrongCntAI<3){
        Swal.fire({
            icon: 'error',
            title: 'Some required connections are missing!',
            confirmButtonText: 'Fix It',
            customClass: {
                icon: 'custom-icon',
                popup: 'custom-popup',
                title: 'custom-title',
                confirmButton: 'custom-confirm-button'
            }
        });
       }else{
	        
	         Swal.fire({
					title: 'Appropriate Connections',
					html: `<div>
                <img src='images/AIDiagram.png' class='img-fluid' 
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
        wrongCntAI++;
        
        
    }
});


}
