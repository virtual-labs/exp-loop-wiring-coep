
function HookUp31(){
    
    
    
	$("#Header").html("<center><span >DIAGRAM</span></center>");

	var htm =`
 
<div class="container-fluid" id="hookUp">
    <div class="row">
        <!-- Left Sidebar (2 columns) -->
        <div class="col-3" style="border:2px solid black;">
			<div class="heading" style="background-color:#425c64; border-radius: 25px; margin-top: 10px;">
			   <p class="heading-text text-center" style="color: white; font-size: 22px; font-weight: 800; padding: 0px;">INSTRUMENT SYMBOLS</p>
		    </div>
		     <button class="btn btn-primary m-2 btn1 button1" id="Procesure">Procedure</button>
              <div class="container-fluid mt-3" style="overflow-y: scroll; height:500px">
                <div class="row">

                
                   <div class="col-4">
                        <div class="component" draggable="true" data-type="LSH1">
                            <img src="images/LSH.png" alt="LSH" draggable="false">
                        </div>
                    </div>
                    
                     <div class="col-4">
                        <div class="component" draggable="true" data-type="LSH1">
                            <img src="images/LSL.png" alt="LSH" draggable="false">
                        </div>
                    </div>
                     
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="LSH">
                            <img src="images/AM.png" alt="LSH" draggable="false">
                        </div>
                    </div> 
                     
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="LSH1">
                            <img src="images/TSH.png" alt="LSH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="TSL">
                            <img src="images/TSL.png" alt="TSL" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="LSH1">
                            <img src="images/PSH.png" alt="LSH" draggable="false">
                        </div>
                    </div>
                   
                   <div class="col-4">
                        <div class="component" draggable="true" data-type="PSL">
                            <img src="images/PSL.png" alt="PSL" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FSHH">
                            <img src="images/FSHH.png" alt="FSHH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FSLL">
                            <img src="images/FSLL.png" alt="FSLL" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FSH">
                            <img src="images/FSH.png" alt="FSH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FSL">
                            <img src="images/FSL.png" alt="FSL" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="LSH">
                            <img src="images/TSHH.png" alt="TSHH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="TSLL">
                            <img src="images/TSLL.png" alt="TSLL" draggable="false">
                        </div>
                    </div>
                   
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="LSH">
                            <img src="images/PSHH.png" alt="PSHH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="LSH">
                            <img src="images/PSLL.png" alt="PSLL" draggable="false">
                        </div>
                    </div>
                   
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="LSH">
                            <img src="images/LSHH.png" alt="LSHH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="LSH">
                            <img src="images/LSLL.png" alt="LSLL" draggable="false">
                        </div>
                    </div>
                   
                   
                    
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="SV" data-subtype="lamp">
                            <img src="images/lamp.png" alt="SV" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="SV" data-subtype="lamp">
                            <img src="images/pumpM.png" alt="SV" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="SV" data-subtype="lamp">
                            <img src="images/SCR.png" alt="SV" draggable="false">
                        </div>
                    </div>
                    
                     <div class="col-4">
                        <div class="component" draggable="true" data-type="SV" data-subtype="solenoid">
                            <img src="images/solenoidValve.png" alt="SV" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="SV" data-subtype="lamp" >
                            <img src="images/FD.png" alt="SV" draggable="false" style = "margin-top:3px;">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="SV" data-subtype="lamp" >
                            <img src="images/ID.png" alt="SV" draggable="false" style = "margin-top:3px;">
                        </div>
                    </div>
                    
                    
                   <div class="col-4">
                        <div class="component" draggable="true" data-type="FT">
                            <img src="images/FT.png" alt="FT" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FT">
                            <img src="images/LT.png" alt="FT" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FT">
                            <img src="images/AT.png" alt="FT" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FT">
                            <img src="images/TT.png" alt="FT" draggable="false">
                        </div>
                    </div>
                    
                   <div class="col-4">
                        <div class="component" draggable="true" data-type="FT">
                            <img src="images/PT.png" alt="FT" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FT">
                            <img src="images/NT.png" alt="FT" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FY1">
                            <img src="images/FY.png" alt="FY" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FY1">
                            <img src="images/NY.png" alt="FY" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FY1">
                            <img src="images/VFD.png" alt="FY" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FY">
                            <img src="images/M.png" alt="FY" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FY">
                            <img src="images/SCRP.png" alt="FY" draggable="false">
                        </div>
                    </div>
                    
                     <div class="col-4">
                        <div class="component" draggable="true" data-type="FY">
                            <img src="images/ID1.png" alt="FY" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="FY">
                            <img src="images/FD1.png" alt="FY" draggable="false">
                        </div>
                    </div>
                    
                    
                    
                     <div class="col-4">
                        <div class="component" draggable="true" data-type="NEGPOS">
                            <img src="images/negPos.png" alt="NEGPOS" draggable="false" style = "margin-top:7px;">
                        </div>
                    </div>
                    
                     <div class="col-4">
                        <div class="component" draggable="true" data-type="POSNEG">
                            <img src="images/posNeg.png" alt="POSNEG" draggable="false" style = "margin-top:7px;">
                        </div>
                    </div>
                    
                     <div class="col-4">
                       
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="CARD">
                            <img src="images/8-bitCard.png" alt="CARD" draggable="false" style = "margin-top:7px;">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="CARD1">
                            <img src="images/8bitCardDO.png" alt="CARD1" draggable="false" style = "margin-top:7px;">
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="component" draggable="true" data-type="CARDA">
                            <img src="images/AIAO.png" alt="CARDA" draggable="false" style = "margin-top:7px;">
                        </div>
                    </div>
                    
                </div>
            </div>
            
      
            <div class="heading" style="background-color:#425c64; border-radius: 25px; margin-top: 20px;" id="tableViewLabel" hidden>
			   <p class="heading-text text-center" style="color: white; font-size: 22px; font-weight: 800; padding: 0px;">BILL OF MATERIAL</p>
		    </div>
		    
		     <div class="container-fluid mt-3" >
                
			  </div>
            
        </div>

        <!-- Main Content (10 columns) -->
       <div class="col-9" style="border:2px solid black;">
		<div id="Header" class="heading1" style="padding:10px; font-weight:bold; font-size:18px; text-align:center;"></div>
		<div id="diagram" class="justify-content-center"></div>
		<div id="table"></div>
		</div>
 
    </div>
</div>
	
	`;
	
	$("#main-div").html(htm);
document.getElementById('Procesure').addEventListener('click', function () {
  Swal.fire({
    title: 'Procedure',
    html: `
      <ol class="procedure-list">
        <li>Select the desired <strong>Plant</strong> from the dropdown menu.</li>
        <li>Choose the <strong>Module type</strong> (DI, DO, AI, or AO). If DI or DO, specify <em>Sinking</em> or <em>Sourcing</em>.</li>
        <li>Drag and drop the components from the <strong>left panel</strong> to the <strong>right blocks</strong>.</li>
        <li>Select any port as a <strong>starting point</strong>, then click another port to connect.</li>
        <li>Right-click on any component or connection and choose <strong>"Delete"</strong>.</li>
        <li>Click <strong>"Validate"</strong> after making connections.</li>
        <li>Repeat for all modules of the selected Plant.</li>
        <li>Click on <strong>"Result"</strong> for performance assessment.</li>
      </ol>
    `,
    customClass: {
      popup: 'custom-popup',
      title: 'custom-title',
      htmlContainer: 'custom-html',
      confirmButton: 'custom-button'
    },
    confirmButtonText: 'Got it!'
  });
});
}




