
function HookUp2(){
    
    
    
	$("#Header").html("<center><span >DIAGRAM</span></center>");

	var htm =`
 
<div class="container-fluid" id="hookUp">
    <div class="row">
        <!-- Left Sidebar (2 columns) -->
        <div class="col-3" style="border:2px solid black;">
			<div class="heading" style="background-color:#425c64; border-radius: 25px; margin-top: 10px;">
			   <p class="heading-text text-center" style="color: white; font-size: 22px; font-weight: 800; padding: 0px;">INSTRUMENT SYMBOLS</p>
		    </div>
              <div class="container-fluid mt-3">
                <div class="row">

                
                   <div class="col-3">
                        <div class="component" draggable="true" data-type="LSH">
                            <img src="images/LSH.png" alt="LSH" draggable="false">
                        </div>
                    </div>
                    
                     <div class="col-3">
                        <div class="component" draggable="true" data-type="LSH">
                            <img src="images/LSL.png" alt="LSH" draggable="false">
                        </div>
                    </div>
                     
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="SV">
                            <img src="images/AM.png" alt="LSH" draggable="false">
                        </div>
                    </div> 
                     
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="LSH">
                            <img src="images/TSH.png" alt="LSH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="TSL">
                            <img src="images/TSL.png" alt="TSL" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="LSH">
                            <img src="images/PSH.png" alt="LSH" draggable="false">
                        </div>
                    </div>
                   
                   <div class="col-3">
                        <div class="component" draggable="true" data-type="PSL">
                            <img src="images/PSL.png" alt="PSL" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="FSHH">
                            <img src="images/FSHH.png" alt="FSHH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="FSLL">
                            <img src="images/FSLL.png" alt="FSLL" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="FSH">
                            <img src="images/FSH.png" alt="FSH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="FSL">
                            <img src="images/FSL.png" alt="FSL" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="TSHH">
                            <img src="images/TSHH.png" alt="TSHH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="TSLL">
                            <img src="images/TSLL.png" alt="TSLL" draggable="false">
                        </div>
                    </div>
                   
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="PSHH">
                            <img src="images/PSHH.png" alt="PSHH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="PSLL">
                            <img src="images/PSLL.png" alt="PSLL" draggable="false">
                        </div>
                    </div>
                   
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="LSHH">
                            <img src="images/LSHH.png" alt="LSHH" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="LSLL">
                            <img src="images/LSLL.png" alt="LSLL" draggable="false">
                        </div>
                    </div>
                   
                   
                   <div class="col-3">
                        <div class="component" draggable="true" data-type="FT">
                            <img src="images/FT.png" alt="FT" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="SV" data-subtype="solenoid">
                            <img src="images/solenoidValve.png" alt="SV" draggable="false">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="SV" data-subtype="lamp">
                            <img src="images/lamp.png" alt="SV" draggable="false">
                        </div>
                    </div>
                    
                     <div class="col-3">
                        <div class="component" draggable="true" data-type="NEGPOS">
                            <img src="images/negPos.png" alt="NEGPOS" draggable="false" style = "margin-top:7px;">
                        </div>
                    </div>
                    
                     <div class="col-3">
                        <div class="component" draggable="true" data-type="POSNEG">
                            <img src="images/posNeg.png" alt="POSNEG" draggable="false" style = "margin-top:7px;">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="CARD">
                            <img src="images/8-bitCard.png" alt="CARD" draggable="false" style = "margin-top:7px;">
                        </div>
                    </div>
                    
                    <div class="col-3">
                        <div class="component" draggable="true" data-type="CARD1">
                            <img src="images/8bitCardDO.png" alt="CARD1" draggable="false" style = "margin-top:7px;">
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
            <div id="diagram" class="justify-content-center"></div>
          <div id="table"></div>
            
        </div>
    </div>
</div>
	
	`;
	
	$("#main-div").html(htm);

}