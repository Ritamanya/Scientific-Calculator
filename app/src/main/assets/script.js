equal = document.getElementById("eql");
    const resultview = document.getElementById("res");
    const inputContainer = document.getElementById('input');
    let currentinputindex = -1;
    newdiv = document.createElement('div');
    newdiv.className = 'parinput';
    inputContainer.appendChild(newdiv);
    let currentinput = newdiv;
    let currentparinput = newdiv;
    //currentfrac;
    function nextelement(element){
        let nxtelement = element.nextElementSibling;
        if(nxtelement !==null){
            return nxtelement;
        }else{
            let parentelement = element.parentNode;
            while(true){
                if(parentelement.nextElementSibling){
                    let newnxtelement = parentelement.nextElementSibling.querySelector('.parinput');
                    if(newnxtelement){
                        let nextdgop = newnxtelement.firstChild;
                        if(nextdgop !== null){
                            return nextdgop;
                        }
                    }else {
                        parentelement = parentelement.parentNode;
                    }
                } parentelement = parentelement.parentNode;
            }


        }
    }


function setprevascurrentinput(element){
        let previousel = detectpreviouselement(element);
        currentinputchanger(previousel,previousel);
}
function closestarentelement(element){
        let currentelement = element;
        while(true){
            if((currentelement.className==='numerator') || (currentelement.className==='denominator') || (currentelement.className==='valueinrt') || (currentelement.className==='numinpow') || (currentelement.className==='pow')){
                return currentelement;
            }else if(currentelement===inputContainer){
                return inputContainer;
            }
            else currentelement = currentelement.parentNode;
        }
}
function closestparentelement(element){
    let currentelement = element;
    while(true){
        if((currentelement.className==='fraction') || (currentelement.className==='rt') || (currentelement.className==='power')){
            return currentelement;
        }else if(currentelement===inputContainer){
            return inputContainer;
        }
        else currentelement = currentelement.parentNode;
    }
}

function detectpreviouselement(element){
        let previouselement = element.previousElementSibling;
        if (previouselement !== null) {
            return previouselement;
        }else{
            let currentparent = element.parentNode;
            while (currentparent.parentNode !== inputContainer){
                currentparent = currentparent.parentNode;
            }
            let previousparentsibling = currentparent.previousElementSibling;
            if(previousparentsibling){
                let lastelement = previousparentsibling.lastChild;
                while ((lastelement.className !== 'parinput')){
                    lastelement = lastelement.lastChild;
                }if(lastelement.lastChild){
                    return lastelement.lastChild;
                }return lastelement;
            }else{
                console.error('Cannot handle when current element is the last one!');
                let firstofinputcontainer = inputContainer.firstChild;
                if(firstofinputcontainer!== null){
                    while((firstofinputcontainer.className !== 'parinput')){
                        firstofinputcontainer = firstofinputcontainer.firstChild;
                    }
                    if(firstofinputcontainer.firstChild !== null){
                        firstofinputcontainer.firstChild;
                    }
                    return firstofinputcontainer;
                }else{
                    console.log('The inputtcontainer is empty!');
                    console.log('creating a parinput...');
                    let newparinput = document.createElement('div');
                    newparinput.className = 'parinput';
                    inputContainer.appendChild(newparinput);
                    return newparinput;

                }
            }

        }
}
function createnewelatfnt(){
    let newparinp = document.createElement('div');
    newparinp.className = 'parinput';
    inputContainer.insertBefore(newparinp, inputContainer.firstChild);
    return newparinp;
}
function isonlychild(element){
        return element.nextElementSibling === null && element.previousElementSibling === null;
}

function space(){
    let previuselement = currentinput.previousElementSibling;
    if(previuselement !== null){
        if(((previuselement.className === 'op') || previuselement.className === 'dg')){
            console.log('moving cursor to previus element sibling!');
            currentinput.remove();
            currentinputchanger(previuselement, previuselement.parentElement);
        }else{
            console.warn('Cursor is not in a dg or op');
        }
    }
    else if(currentinput.className === 'ph'){

        console.log('Cursor is on a placeholder!');
        let parinputarr = Array.from(inputContainer.querySelectorAll('.parinput'));
        console.log(parinputarr);
        if((currentinput.className !== 'parinput') && ((currentinput.className === 'ph'))){
            let currentparent = currentinput.parentElement;
            let currentparentindex = parinputarr.indexOf(currentparent);
            if(currentparentindex !== 0){
                currentinput.remove();

                let regress = 1;
                let isbreaked = 0;
                let previousparent = parinputarr[currentparentindex-regress];
                while((previousparent.querySelector('.dg') === null) && (previousparent.querySelector('.op') === null)){
                    regress++;
                    if(currentparentindex-regress >= 0){
                        previousparent = parinputarr[currentparentindex-regress];
                    }else{
                        console.log('Creating new parinput...');
                        let newparinput = document.createElement('div');
                        newparinput.className = 'parinput';
                        inputContainer.insertBefore(newparinput,inputContainer.firstChild);
                        currentinput.remove();
                        currentinputchanger(newparinput,newparinput);
                        console.log('breaking...');
                        isbreaked = 1;
                        break;
                    }
                }
                if(isbreaked === 0){
                    currentinputchanger(previousparent.lastChild,previousparent);
                }
                if(currentparent.textContent === ''){
                    if(closestparentelement(currentparent)!==inputContainer){
                        let closestparentelementel = closestparentelement(currentparent);
                        //console.log(closestparentelementel);
                        console.log(`the textcontent is:|${closestparentelementel.textContent}| end`);
                        if(closestparentelementel.textContent.trim()==='') {
                            console.log(closestparentelementel);

                            let closestparentofclosest = closestparentelement(closestparentelementel);
                            if(closestparentofclosest!==inputContainer){
                                console.log(closestparentofclosest);
                                if(isonlychild(currentparent)){
                                    currentinputchanger(placeholdercreator(closestparentelementel.parentNode));
                                }                            }
                            closestparentelementel.remove();
                        }
                        else {
                            if(isonlychild(currentparent)){
                                placeholdercreator(currentparent);
                            }
                        }
                    }
                }
                //}
                //currentinputchanger(parinputarr[currentparentindex-1],parinputarr[currentparentindex-1]);
            }else{
                console.log('Creating new parinput...');
                let newparinput = document.createElement('div');
                newparinput.className = 'parinput';
                inputContainer.insertBefore(newparinput,inputContainer.firstChild);
                currentinput.remove();
                currentinputchanger(newparinput,newparinput);
                console.log(currentparent);
                if(currentparent.textContent === '') currentparent.remove();
            }

        }

    }

    else{
        currentinput.remove();
        console.log('previus element not found searching for previus parinput!');
        let parinputarr = Array.from(inputContainer.querySelectorAll('.parinput'));
        console.log(parinputarr);
        if((currentinput.className !== 'parinput') && ((currentinput.className === 'dg') || (currentinput.className === 'op'))){
            let currentparent = currentinput.parentElement;
            let currentparinpindex = parinputarr.indexOf(currentparent);
            let regress = 0;
            let isbreaked = 0;
            let previousparent;
            do{
                regress++;
                if(currentparinpindex-regress >= 0){
                    previousparent = parinputarr[currentparinpindex - regress];
                }else{
                    isbreaked = 1;
                    break;
                }
            }while((previousparent.querySelector('.dg') === null) && (previousparent.querySelector('.op') === null))
            if(isbreaked === 0){
                //current parent is empty except the currentinput that is already confirmed!
                let closestparent = closestparentelement(currentparent);
                if(closestparent!==inputContainer){
                    if(isonlychild(currentparent)){
                        currentinputchanger(placeholdercreator(currentparent));
                    }else currentparent.remove();
                }else currentparent.remove();
            }else {
                const newel = createnewelatfnt();
                currentinputchanger(newel,newel);
            }


        }
    }

}
function bspace(){
    let previuselement = currentinput.previousElementSibling;
    if(previuselement !== null){
        if(((previuselement.className === 'op') || previuselement.className === 'dg')){
            console.log('moving cursor to previus element sibling!');
            currentinput.remove();
            currentinputchanger(previuselement, previuselement.parentElement);
        }else{
            console.warn('Cursor is not in a dg or op');
        }
    }
    else if(currentinput.className === 'ph'){

        console.log('Cursor is on a placeholder!');
        let parinputarr = Array.from(inputContainer.querySelectorAll('.parinput'));
        console.log(parinputarr);
        if((currentinput.className !== 'parinput') && ((currentinput.className === 'ph'))){
            let currentparent = currentinput.parentElement;
            let currentparentindex = parinputarr.indexOf(currentparent);
            if(currentparentindex !== 0){
                currentinput.remove();

                let regress = 1;
                let isbreaked = 0;
                let previousparent = parinputarr[currentparentindex-regress];
                while((previousparent.querySelector('.dg') === null) && (previousparent.querySelector('.op') === null)){
                    regress++;
                    if(currentparentindex-regress >= 0){
                        previousparent = parinputarr[currentparentindex-regress];
                    }else{
                        console.log('Creating new parinput...');
                        let newparinput = document.createElement('div');
                        newparinput.className = 'parinput';
                        inputContainer.insertBefore(newparinput,inputContainer.firstChild);
                        currentinput.remove();
                        currentinputchanger(newparinput,newparinput);
                        console.log('breaking...');
                        isbreaked = 1;
                        break;
                    }
                }
                if(isbreaked === 0){
                    currentinputchanger(previousparent.lastChild,previousparent);
                }
                if(currentparent.textContent === ''){
                    if(closestparentelement(currentparent)!==inputContainer){
                        let closestparentelementel = closestparentelement(currentparent);
                        //console.log(closestparentelementel);
                        console.log(`the textcontent is:|${closestparentelementel.textContent}| end`);
                        if(closestparentelementel.textContent.trim()==='') {
                            console.log(closestparentelementel);

                            let closestparentofclosest = closestparentelement(closestparentelementel);
                            if(closestparentofclosest!==inputContainer){
                                console.log(closestparentofclosest);
                                currentinputchanger(placeholdercreator(closestparentelementel.parentNode));
                            }
                            closestparentelementel.remove();
                        }
                        else placeholdercreator(currentparent);
                    }
                }
                //}
                //currentinputchanger(parinputarr[currentparentindex-1],parinputarr[currentparentindex-1]);
            }else{
                console.log('Creating new parinput...');
                let newparinput = document.createElement('div');
                newparinput.className = 'parinput';
                inputContainer.insertBefore(newparinput,inputContainer.firstChild);
                currentinput.remove();
                currentinputchanger(newparinput,newparinput);
                console.log(currentparent);
                if(currentparent.textContent === '') currentparent.remove();
            }

        }

    }
    else{
        console.log('previus element not found searching for previus parinput!');
        let parinputarr = Array.from(inputContainer.querySelectorAll('.parinput'));
        console.log(parinputarr);
        if((currentinput.className !== 'parinput') && ((currentinput.className === 'dg') || (currentinput.className === 'op'))){
            let currentparent = currentinput.parentElement;
           /* let currentparentindex = parinputarr.indexOf(currentparent);
            if(currentparentindex !== 0){
                currentinput.remove();

                let regress = 1;
                let isbreaked = 0;
                let previousparent = parinputarr[currentparentindex-regress];
                while((previousparent.querySelector('.dg') === null) && (previousparent.querySelector('.op') === null)){
                    regress++;
                    if(currentparentindex-regress >= 0){
                        previousparent = parinputarr[currentparentindex-regress];
                    }else{
                        console.log('Creating new parinput...');
                        let newparinput = document.createElement('div');
                        newparinput.className = 'parinput';
                        inputContainer.insertBefore(newparinput,inputContainer.firstChild);
                        currentinput.remove();
                        currentinputchanger(newparinput,newparinput);
                        console.log('breaking...');
                        isbreaked = 1;
                        break;
                    }
                }
                if(isbreaked === 0){
                    currentinputchanger(previousparent.lastChild,previousparent);
                    if(currentparent.textContent === '') currentparent.remove();
                }
                //currentinputchanger(parinputarr[currentparentindex-1],parinputarr[currentparentindex-1]);
            }else{
                console.log('Creating new parinput...');
                let newparinput = document.createElement('div');
                newparinput.className = 'parinput';
                inputContainer.insertBefore(newparinput,inputContainer.firstChild);
                currentinput.remove();
                currentinputchanger(newparinput,newparinput);
                console.log(currentparent);
                if(currentparent.textContent === '') currentparent.remove();
            }*/
            currentinput.remove();
            //currentinputchanger(placeholdercreator(currentparent), currentparent);
            let currentparindex = parinputarr.indexOf(currentparent);
            let regress = 0;
            let isbreaked = 0;
            let prevparent = parinputarr[currentparindex-regress];
            while ((prevparent.querySelector('.dg') === null) && (prevparent.querySelector('.op') === null) && (prevparent.querySelector('.ph') === null)){
                regress++;
                if(currentparindex-regress >= 0){
                    prevparent = parinputarr[currentparindex-regress];
                }else {
                    isbreaked = 1;
                    break;
                }

            }
            if(isbreaked === 0){
                let closestmainprntel = closestparentelement(currentparent);
                if(closestmainprntel!==inputContainer){
                    if(closestmainprntel.textContent.trim()===''){
                        closestmainprntel.remove();
                    }else{
                        if(currentparent.previousElementSibling === null && currentparent.nextElementSibling === null){
                            placeholdercreator(currentparent);
                        }else currentparent.remove();
                    }
                }else currentparent.remove();
                currentinputchanger(prevparent.lastChild,prevparent);
            }else {
                currentinputchanger(createnewelatfnt());
            }

        }
    }

}
function prevparinpfinder(element){
        const parinputarr = Array.from(inputContainer.querySelectorAll('.parinput'));
        console.log(parinputarr);
        const currentparind = parinputarr.indexOf(element);
        console.log(currentparind);
        let regress = 1;
        let prevparent = parinputarr[currentparind-regress];
        if(currentparind-regress >= 0){
            while ((prevparent.querySelector('.dg') === null) && (prevparent.querySelector('.op') === null)){
                regress++;
                if(currentparind-regress >= 0){
                    prevparent = parinputarr[currentparind-regress];
                }else{
                    return null;
                }
            }
            return prevparent;
        }return null;
}
function prevparinpbkspret(element){
        let res = prevparinpfinder(element);
        if(res !== null) return res;
        else return createnewelatfnt();
}
function inputalonechecker(element){
        let res = element;
        if((res.className === 'dg') && (res.className === 'op')){
            //complete this func it will be used in bkspace func!
        }
}
function closeparelnumdenetc(element){
        let res = element;
        while(res.className !== 'numerator' && res.className !== 'denominator' && res.className !== 'valueinrt' && res.className !== 'numinpow' && res.className !== 'pow' && res !== inputContainer){
            res = res.parentNode;
        }return res;
}

function inpelremover(element){
        let res = element;
        if(closestparentelement(res) === inputContainer){
            res.remove();
        }else {
            closepar = closestparentelement(res);
            res.className = "fordel";
            if(closepar.querySelector('.dg') === null && closepar.querySelector('.op') === null) closepar.remove()
            else {
                parnumdenetc = closeparelnumdenetc(res);
                if(parnumdenetc!==inputContainer){
                    if (parnumdenetc.querySelector('.dg') === null && parnumdenetc.querySelector('.op') === null) {
                        if (res.className === 'parinput') placeholdercreator(res);
                        else placeholdercreator(res.parentNode);
                    }
                }
                res.remove();
            }
        }
}
function prevparinpbkspretinpchanger(element){
        let res = prevparinpfinder(element);
        if(res !== null) {
            //currentinput.remove();
            inpelremover(currentinput);
            currentinputchanger(res.lastChild,res);
        }else{
            console.log('createnewelatfnt from bkspinpchanger');
            let newres = createnewelatfnt();
            //currentinput.remove();
            inpelremover(currentinput);
            currentinputchanger(newres,newres);
        }
}

function bkspace(){
        let previusdgop = currentinput.previousElementSibling;
        if(previusdgop !== null){
            //console.log(previusdgop);
            console.log("bksi1");
            currentinput.remove();
            currentinputchanger(previusdgop,previusdgop.parentNode);

        }

        else if(currentinput.className !== 'ph'){
            let curinp = currentinput;
            if(currentinput.className !== 'parinput'){
                prevparinpbkspretinpchanger(curinp.parentElement);//here is some problem when there is a single rt or root element inside a fraction!
            }else{
                prevparinpbkspretinpchanger(curinp);
            }
        }

        // first write an else if for when prevdgop not available in current parinp!


        else if (currentinput.className === 'ph'){
            let currentparent = currentinput.parentElement;
            let closestparent = closestparentelement(currentparent);
            console.log("bksi2");
            if(closestparent!==inputContainer){
                if(closestparent.textContent.trim()!==''){
                    if(isonlychild(currentparent)){
                        prevparinpbkspretinpchanger(currentparent);
                    }else{
                        prevparinpbkspretinpchanger(currentparent);
                        currentparent.remove();
                    }
                }else{
                    const closestgrandparent = closestparentelement(closestparent);
                    if(closestgrandparent!==inputContainer){
                        if(isonlychild(closestparent)){
                            let plchl = placeholdercreator(closestparent.parentNode);
                            currentinputchanger(plchl,plchl.parentNode);
                            closestparent.remove();
                        }
                    }else {
                        let prevparinp = prevparinpfinder(currentparent);
                        if(prevparinp !== null){
                            currentinputchanger(prevparinp.lastChild,prevparinp);
                            closestparent.remove();
                        }else{
                            let newparinp = createnewelatfnt();
                            currentinputchanger(newparinp,newparinp);
                            closestparent.remove();
                        }
                    }
                }
            }

        }

        else{
            console.log('main else executing...');
            console.log("bksi3");
            //Log from every part and debug!!
            let currentparent = currentinput.parentElement;
            let closestparent = closestparentelement(currentparent);
            if(closestparent!==inputContainer){
                if(isonlychild(currentparent)){
                    let plchld = placeholdercreator(currentparent);
                    currentinputchanger(plchld,currentparent);
                }else{
                    let prevparent = prevparinpbkspret(currentparent);
                    let lstchld = prevparent.lastChild;
                    if(lstchld!==null){
                        currentinputchanger(lstchld,prevparent);
                    }else{
                        currentinputchanger(prevparent,prevparent);
                    }currentparent.remove();
                }
            }else{
                /*let prevparent = currentinput.parentElement;
                let lstchld = placeholdercreator(currentparent);
                if(lstchld!==null){
                    currentinputchanger(lstchld,prevparent);
                }else{
                    currentinputchanger(prevparent,prevparent);
                }*/
                prevparinpbkspretinpchanger(currentparent);
                //prevparinpbkspretinpchanger(currentparent);
                console.log(currentparent);
                currentparent.remove();
            }
        }
}

// Create a function to add click function to all dg and op using query selector.



    currentinputchanger(newdiv);
    newparinpenvset(newdiv);
    function removecursor(element){
        if(element !== null){
            const cursor = element.querySelector('.cursor');
            if (cursor !== null) cursor.remove();
        }else{
            const cursor = inputContainer.querySelector('.cursor');
            if (cursor !== null) cursor.remove();
        }
    }
    function newparinpenvset(element){
        if((element.className==='dg') || (element.className==='op') || (element.className==='ph')){
            element.addEventListener('click', function () {
                currentinputchanger(element,element.parentNode);
            });
            //dgoparrregisterer();
        }
    }
    function currentinputchanger(element,parinput){
        /*if((currentinput !== inputContainer) && (currentinput != null)){
            currentinput.style.border = `none`;
        }*/
        //element.style.border = `solid 0.6px rgb(15, 0, 180)`;
        prevcursor = currentinput.querySelector('.cursor');
        if(prevcursor != null) prevcursor.remove();
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        element.appendChild(cursor);
        currentinput = element;
        currentparinput = parinput;
    }
    function sqrt(){
        currentinput.className = 'rt';
        currentinput.innerHTML = `
        <img class="rtimg" style="width: 10px; height: 50px; margin-right: -0.52px; margin-top: -0px;" src="root.svg">
        `;
        
        valinrt = document.createElement('div');
        parinp = document.createElement('div');
        parinp.className = 'parinput';
        valinrt.appendChild(parinp);
        valinrt.className = 'valueinrt';
        currentinput.appendChild(valinrt);
        let placeholder = placeholdercreator(parinp);
        currentinputchanger(placeholder, placeholder.parentNode);
    }
    function power(){
        currentinput.style.border = `none`;
        removecursor(currentinput);
        let num;
        try{
            num = currentparinput.innerHTML;
        }catch(e){
            inputContainer.innerHTML = '';
            let newparinput = document.createElement('div');
            newparinput.className = 'parinput';
            inputContainer.appendChild(newparinput);
            currentinputchanger(newparinput,newparinput);
            num = '';
        }
        currentparinput.className = 'power';

        currentparinput.innerHTML = '';
        numcont = document.createElement('div');
        numcont.className = 'numinpow';
        currentparinput.appendChild(numcont);

        parnumcont = document.createElement('div');
        parnumcont.className = 'parinput';
        parnumcont.innerHTML = num;
        if(parnumcont.textContent === ''){
            parnumcont.innerHTML = '';
            placeholdercreator(parnumcont);
        }
        const childnumcontnodes = parnumcont.childNodes;
        for(let i = 0; i < childnumcontnodes.length; i++){
            newparinpenvset(childnumcontnodes[i]);
        }
        numcont.appendChild(parnumcont);

        powcont = document.createElement('sup');
        powcont.className = 'pow';
        currentparinput.appendChild(powcont);

        parpowcont = document.createElement('div');
        parpowcont.className = 'parinput';
        parpowcont.textContent = '';
        powcont.appendChild(parpowcont);
        let parpowcontplchld =placeholdercreator(parpowcont);
        currentinputchanger(parpowcontplchld,parpowcont);
    }
    function sin(){
        sinpel = document.createElement('div');
        sinpel.className = 'sinp';
        currentinput.parentNode.appendChild(sinpel);

        sinsgn = document.createElement('div');
        sinsgn.className = 'sinsg';
        sinsgn.textContent = 'sin';
        sinpel.appendChild(sinsgn);

        sinopbrkel = document.createElement('div');
        sinopbrkel.className = 'sinopbrkel';
        sinopbrkel.textContent = '(';
        sinpel.appendChild(sinopbrkel);

        sinnumcntel = document.createElement('div');
        sinnumcntel.className = 'sinnumcnt';
        parinputel = document.createElement('div');
        parinputel.className = 'parinput';
        sinnumcntel.appendChild(parinputel);
        let placeholder = placeholdercreator(parinputel);
        sinpel.appendChild(sinnumcntel);

        sinclbrkel = document.createElement('div');
        sinclbrkel.className = 'sinclbrkel';
        sinclbrkel.textContent = ')';
        sinpel.appendChild(sinclbrkel);

        currentinputchanger(placeholder,parinputel);
    }

    
    function endset(){
        newdiv = document.createElement('div');
        inputContainer.appendChild(newdiv);
        newdiv.className = 'parinput';
        currentinputchanger(newdiv,newdiv);
        
    }
    let denlist = [];
    console.log(denlist);
    function evaluateresult() {
    try {
        // Get the complete mathematical expression string
        const expressionString = parseExpressionString(inputContainer);
        console.log("Expression to evaluate:", expressionString); // Good for debugging!

        if (expressionString.trim() === '') {
            resultview.textContent = '0';
            return;
        }

        // Perform the calculation on the complete string
        const result = eval(expressionString.trim());
        resultview.textContent = String(result);

        // Optional: Reset input or display result as new starting point
        // (Your existing code handles this; ensure it's still suitable)
        //initializeInput(); // Assuming this resets the input area
        //currentinput.textContent = String(result); // Sets the result as the starting input for next calculation

    } catch (error) {
        resultview.textContent = 'Error';
        console.error("Calculation error:", error);
    }
}
    function directchildselector(pelement,clsname){
        childnodes = pelement.childNodes;
        for(let i = 0; i < childnodes.length; i++){
            if(childnodes[i].className === clsname) return childnodes[i];
        }
        return null;
    }

    /**
 * Recursively parses an HTML element and its children to construct a single, complete
 * mathematical expression string. This function DOES NOT perform any evaluation;
 * its sole purpose is to build the string representation.
 *
 * It gracefully handles:
 * - Regular numbers and operators.
 * - Expressions within fractions (e.g., (1+2)/(3-4)).
 * - Fractions within fractions (e.g., 1 / (2 / (3 / 4))).
 *
 * @param {HTMLElement} element The root HTML element to start parsing from (e.g., your 'inputContainer').
 * @returns {string} The complete mathematical expression as a string, ready for a single 'eval()' call.
 */
function parseExpressionString(element) {
    let expr = '';
    // Iterate over the actual child *nodes* of the current element
    // This is crucial because a numerator or denominator can contain multiple 'parinput' divs or even 'fraction' divs
    const childNodes = element.childNodes; 

    for (let i = 0; i < childNodes.length; i++) {
        const child = childNodes[i];

        // Case 1: Text nodes (direct text entered, not wrapped in a parinput)
        if (child.nodeType === Node.TEXT_NODE) {
            // Trim to remove accidental whitespace, replace 'x' with '*'
            const textContent = child.nodeValue.trim();
            if (textContent) {
                expr += textContent.replace(/X/g, '*');
            }
        }
        // Case 2: Element nodes (divs, buttons, etc.)
        else if (child.nodeType === Node.ELEMENT_NODE) {
            // Regular input elements (numbers or operators)
            if (child.className === 'parinput') {
                parinpclilds = child.childNodes;
                for (let j = 0; j < parinpclilds.length; j++) {
                    const child = parinpclilds[j];
                    expr += child.textContent.replace(/X/g, '*').replace(/÷/g, '/');
                }
                // Replace 'x' (display character) with '*' (mathematical operator)
                //expr += child.textContent.replace(/X/g, '*').replace(/÷/g, '/');
            }
            else if(child.className === 'power'){
                const numinpowcont = child.querySelector('.numinpow');
                const powcont = child.querySelector('.pow');

                const exprinnuminpow = parseExpressionString(numinpowcont);
                const exprinpow = parseExpressionString(powcont);

                expr += `(${Math.pow(eval(exprinnuminpow),eval(exprinpow))})`;


                
            }
            else if(child.className === 'rt'){
                numinrt = child.querySelector('.valueinrt');
                expr+= `Math.pow(${parseExpressionString(numinrt)},(1/2))`;
            }
            else if (child.className === 'sinp'){
                numcnt = child.querySelector('.sinnumcnt');
                expr += `Math.sin(${parseExpressionString(numcnt)})`;

            }
            // Case 3: Fraction elements (potentially nested)
            else if (child.className === 'fraction') {
                const numeratorEl = directchildselector(child,'numerator');
                const denominatorEl = directchildselector(child,'denominator');
               /* denlist.unshift(denominatorEl);
                console.log(denlist);
                console.log(numeratorEl);
                console.log(denominatorEl);*/


                // Recursively call this function for the numerator and denominator's *content*
                // This is how expressions within fractions and fractions within fractions are handled!
                const numExpr = parseExpressionString(numeratorEl);
                const denExpr = parseExpressionString(denominatorEl);
                /*console.log(numeratorEl);
                console.log(denominatorEl);
                console.log(numExpr);
                console.log(denExpr);*/
                expr += `((${(numExpr)}) / (${(denExpr)}))`;

                /*// Handle incomplete or empty fractions gracefully
                if (numExpr.trim() === '' && denExpr.trim() === '') {
                    // If both numerator and denominator are empty, treat the fraction as 0
                    expr += '0';
                } else if (numExpr.trim() === '' || denExpr.trim() === '') {
                    // If one part is missing, it's an incomplete expression, treat as 0 or throw error
                    console.warn("Incomplete fraction detected during string building. Treating as 0 for calculation safety.");
                    expr += '0';
                } else {
                    // Crucially, wrap numerator and denominator in parentheses.
                    // The outer set ensures the entire fraction acts as a single value
                    // The inner sets ensure expressions within numerator/denominator are evaluated first.

                }*/
            }
            // If there are other HTML elements that shouldn't be part of the expression, they are ignored.
        }
    }
    return expr;
}
/*function parsexpressionString(element) {
    let expr = '';
    const childNodes = element.childNodes; // Iterate all child nodes, including text nodes

    for (let i = 0; i < childNodes.length; i++) {
        const child = childNodes[i];

        if (child.nodeType === Node.TEXT_NODE) {
            // Handle any direct text content (e.g., if a number or operator was directly typed,
            // though your appender should largely prevent this for complex inputs)
            const textContent = child.nodeValue.trim();
            if (textContent) {
                expr += textContent.replace(/X/g, '*').replace(/÷/g, '/');
            }
        }
        else if (child.nodeType === Node.ELEMENT_NODE) {
            // --- Specific handling for 'parinput' elements ---
            if (child.className === 'parinput') {
                // According to your rule: parinput contains multiple 'dg's OR a single 'op'
                // We iterate through its *element* children as 'dg' and 'op' are elements.
                const parinputChildren = child.children;
                for (let j = 0; j < parinputChildren.length; j++) {
                    const grandChild = parinputChildren[j];
                    if (grandChild.className === 'dg' || grandChild.className === 'op') {
                        // Simply append the text content for 'dg' (digit) or 'op' (operator)
                        expr += grandChild.textContent.replace(/X/g, '*').replace(/÷/g, '/');
                    }
                    // No 'else if' for other complex types (fraction, power, etc.) here
                    // because a 'parinput' is confirmed not to contain them directly.
                }
            }
            // --- Handling for other complex elements ---
            else if (child.className === 'power') {
                const numinpowcont = child.querySelector('.numinpow');
                const powcont = child.querySelector('.pow');
                const exprinnuminpow = parseExpressionString(numinpowcont);
                const exprinpow = parseExpressionString(powcont);

                const base = exprinnuminpow.trim() !== '' ? `(${exprinnuminpow})` : '0'; // Wrap for safety
                const exponent = exprinpow.trim() !== '' ? `(${exprinpow})` : '0';   // Wrap for safety
                expr += `(Math.pow(${base},${exponent}))`;
            }
            else if (child.className === 'rt') {
                const numinrt = child.querySelector('.valueinrt');
                expr += `(Math.pow(${parseExpressionString(numinrt)},(1/2)))`;
            }
            else if (child.className === 'sinp') {
                const numcnt = child.querySelector('.sinnumcnt');
                expr += `(Math.sin(${parseExpressionString(numcnt)}))`;
            }
            else if (child.className === 'fraction') {
                const numeratorEl = child.querySelector('.numerator');
                const denominatorEl = child.querySelector('.denominator');

                // Robust error checking for missing parts of a fraction
                if (!numeratorEl || !denominatorEl) {
                    console.warn("Fraction structure missing numerator or denominator. Treating as 0.");
                    expr += '0';
                    continue; // Move to the next child of the current element
                }

                const numExpr = parseExpressionString(numeratorEl);
                const denExpr = parseExpressionString(denominatorEl);

                // Handle cases where numerator/denominator expressions might be empty
                if (numExpr.trim() === '' && denExpr.trim() === '') {
                    expr += '0'; // Both empty, treat as zero
                } else if (denExpr.trim() === '') {
                    console.warn("Empty denominator in fraction. Treating fraction as 0 to avoid division by zero.");
                    expr += '0';
                } else {
                    // Crucially wrap numExpr and denExpr for correct evaluation order
                    expr += `((${numExpr}) / (${denExpr}))`;
                }
            }
            // Any other element classes found here would be ignored by the parser,
            // unless they are meant to contribute to the mathematical expression.
        }
    }
    return expr;
}*/
function placeholdercreator(element){
    let placeholder;
    if(element.className === 'parinput'){
        placeholder = document.createElement('div');
        placeholder.className = 'ph';
        element.appendChild(placeholder);
    }else{
        let newparinputel = document.createElement('div');
        newparinputel.className = 'parinput';
        element.appendChild(newparinputel);
        placeholder = document.createElement('div');
        placeholder.className = 'ph';
        newparinputel.appendChild(placeholder);
    }
    newparinpenvset(placeholder);
    return placeholder;
}
    function Fraction(numerator) {
                // Select the main input container
        try{
            currentparinput.textContent = '';
        }catch(e){
            currentparinput = document.createElement('div');
            currentparinput.className = 'parinput';
            inputContainer.appendChild(currentparinput);
            currentinputchanger(currentparinput,currentparinput);
        }

                if (!inputContainer) {
                    console.error("Error: The '#input' container was not found.");
                    return;
                }            
                    fractionContainer = document.createElement('div');
                    fractionContainer.className = 'fraction';
                    currentparinput.parentNode.appendChild(fractionContainer);
                

                // Clear any existing content inside the fraction container
                fractionContainer.innerHTML = '';

                // Create the div for the numerator
                const numDiv = document.createElement('div');
                const numsubdiv = document.createElement('div');
                numDiv.className = 'numerator'
                numsubdiv.className = 'parinput';
                /*numsubdiv.addEventListener('click',function(){
                    currentinputchanger(numsubdiv);
                });*/
                if(numerator === ''){
                    let numeratorplchld = placeholdercreator(numsubdiv);
                }else{
                    numsubdiv.innerHTML = numerator;

                }
                numDiv.appendChild(numsubdiv);


                // Create the horizontal rule (HR) for the division line
                const lineHr = document.createElement('hr');

                // Create the div for the denominator
                const denDiv = document.createElement('div');
                const densubDiv = document.createElement('div');
                denDiv.className = 'denominator';
                densubDiv.className = 'parinput';
                /*densubDiv.addEventListener('click',function(){
                    currentinputchanger(densubDiv);
                });*/
                denDiv.appendChild(densubDiv);

                // Append the created elements to the fraction container
                fractionContainer.appendChild(numDiv);
                fractionContainer.appendChild(lineHr);
                fractionContainer.appendChild(denDiv);
                currentparinput.remove();
                let denplaceholder = placeholdercreator(densubDiv);
                currentinputchanger(denplaceholder,densubDiv);
                //parinpinnumsub = numsubdiv.querySelector('.parinput');
                parinpinnumsubchd = numsubdiv.firstChild;
                while(parinpinnumsubchd) {
                    newparinpenvset(parinpinnumsubchd);
                    parinpinnumsubchd = parinpinnumsubchd.nextSibling;
                }
            }

function Fration(oldContentContainingElement) {
    // This argument `oldContentContainingElement` is the DOM element
    // (likely your `currentparinput`) whose children (dg/op elements)
    // need to be moved into the numerator of the new fraction.

    // 1. Basic validation
    if (!oldContentContainingElement || !oldContentContainingElement.parentNode) {
        console.error("Error: The element whose content needs to be moved is invalid or has no parent.");
        return;
    }

    // 2. Create the main fraction container
    const fractionContainer = document.createElement('div');
    fractionContainer.className = 'fraction';

    // 3. Insert the new fraction container into the DOM
    //    It will replace the `oldContentContainingElement`'s position.
    oldContentContainingElement.parentNode.insertBefore(fractionContainer, oldContentContainingElement);

    // 4. Remove the old content element, as its content has been moved.
    //oldContentContainingElement.remove();

    // 5. Create the Numerator structure
    const numDiv = document.createElement('div');
    numDiv.className = 'numerator';
    fractionContainer.appendChild(numDiv);

    // Create the `parinput` div specifically for the numerator's content
    const numParInput = document.createElement('div');
    numParInput.className = 'parinput'; // Ensure it has the 'parinput' class
    numDiv.appendChild(numParInput);

    // 6. **CRITICAL STEP:** Move all existing child nodes (dg, op elements)
    //    from the `oldContentContainingElement` to the new `numParInput`.
    //    `appendChild` automatically removes the child from its previous parent.
    while (oldContentContainingElement.firstChild) {
        numParInput.appendChild(oldContentContainingElement.firstChild);
    }

    // 7. Create the horizontal rule (division line)
    const lineHr = document.createElement('hr');
    fractionContainer.appendChild(lineHr);

    // 8. Create the Denominator structure
    const denDiv = document.createElement('div');
    denDiv.className = 'denominator';
    fractionContainer.appendChild(denDiv);

    // Create an initial empty `parinput` for the denominator
    const denParInput = document.createElement('div');
    denParInput.className = 'parinput'; // Ensure it has the 'parinput' class
    denDiv.appendChild(denParInput);

    // 9. Update focus and event listeners for the new elements

    // Set `currentinput` and `currentparinput` to the new denominator's parinput,
    // making it the active input area.
    // The parent of `denParInput` is `denDiv`.
    currentinputchanger(denParInput, denParInput.parentNode);

    // Set up click listeners for the new denominator's parinput
    newparinpenvset(denParInput);

    // Re-apply event listeners to the elements that were moved into the numerator.
    // This is important for `dg` elements to remain clickable.
    let movedNumChild = numParInput.firstChild;
    while(movedNumChild) {
        // Ensure newparinpenvset is called only on `dg` elements as per its logic (if element.className === 'dg')
        newparinpenvset(movedNumChild);
        movedNumChild = movedNumChild.nextSibling;
    }
}
        function appender(sym){
            if(!(sym === ' a/b ')){
                if((sym === ' + ') || (sym === ' - ') || (sym === ' x ') || (sym === ' / ') || (sym === ' ÷ ')){
                    newdiv = document.createElement('div');
                    newdiv.className = 'parinput';
                    if((currentinput.className === 'numerator') || (currentinput.className === 'denominator')){currentinput.appendChild(newdiv); console.log("if excuted");}
                    else if((currentinput.parentNode.className === 'denominator')  || (currentinput.parentNode.className === 'numerator')){
                        currentparinput.parentNode.appendChild(newdiv);
                        console.log("else if excuted");
                    }
                    else{
                        console.log("else excuted");
                        currentparinput.parentNode.appendChild(newdiv);
                    }
                    op=document.createElement("div");
                    op.className = 'op';
                    op.innerHTML=sym;
                    newdiv.appendChild(op);
                    newparinpenvset(op);
                    newdiv = document.createElement('div');
                    newdiv.className = 'parinput';
                    if((currentparinput.className === 'numerator') || (currentparinput.className === 'denominator')){currentparinput.appendChild(newdiv); console.log("if excuted");}
                    else if((currentparinput.parentNode.className === 'denominator')  || (currentparinput.parentNode.className === 'numerator')){
                        currentparinput.parentNode.appendChild(newdiv);
                        console.log("else if excuted");
                    }
                    else{
                        console.log("else excuted");
                        currentparinput.parentNode.appendChild(newdiv);
                    }
                    if (currentparinput.innerHTML === '' || currentparinput.innerHTML === ' '){currentparinput.remove();}
                    currentinputchanger(newdiv,newdiv);
                    newparinpenvset(dgel);
                    
                }else{
                    dgel = document.createElement('div');
                    dgel.className = 'dg';
                    dgel.textContent=sym;
                    if((currentinput.className === 'parinput')) {
                            currentparinput = currentinput;
                            currentparinput.appendChild(dgel);
                    }else if(currentinput.className === 'ph'){
                        currentinput.parentNode.appendChild(dgel);
                        currentinput.remove();


                    }
                    else{
                        currentparinput.insertBefore(dgel, currentinput.nextSibling);
                    }
                    currentinputchanger(dgel,currentparinput);
                    newparinpenvset(dgel);
                    //currentinput.textContent= currentinput.textContent+sym;
                }
                scrollToEnd();
                if(currentinput.closest('.pow') != null){
                    powconth = currentinput.closest('.pow');
                    console.log('margin manipulation started!');
                    powerparent = powconth.parentNode;
                    pownumconth = powerparent.querySelector('.numinpow');
                    powconthheight = powconth.getBoundingClientRect().height;
                    console.log(`height = ${powconthheight}`);
                    powconth.style.marginBottom = `${(powconthheight)-(powconthheight*0.1)}px`;
                    console.log(`margin changed to ${powconthheight+40}`);
                }
                
                
            }else{
                if(currentinput.closest('.pow') != null){
                    console.log('margin manipulation started!');
                    powconth = currentinput.closest('.pow');
                    powerparent = powconth.parentNode;
                    pownumconth = powerparent.querySelector('.numinpow');
                    powconthheight = powconth.getBoundingClientRect().height;
                    console.log(`height = ${powconthheight}`);
                    powconth.style.marginBottom = `${(powconthheight)-(powconthheight*0.1)}px`;
                    console.log(`margin changed to ${powconthheight+40}`);
                }
                //currentinput.style.border = `none`;
                removecursor(currentinput);
                try{
                    Fraction(currentparinput.innerHTML);
                }catch(e){
                    console.log(e);
                    Fraction('');
                }
                
            }
            // Replace the last if block in your appender function with this:
            pntatcheck = currentinput;
            while (pntatcheck.closest('.rt') != null) {
                const parentrt = pntatcheck.closest('.rt');
                const rtimg = parentrt.querySelector('.rtimg');
                const valinrt = parentrt.querySelector('.valueinrt');

                if (rtimg && valinrt) { // Ensure both elements exist
                    // Use scrollHeight for the total content height, including overflow
                    const contentHeight = valinrt.scrollHeight;
                    // Add a small buffer (e.g., 4px or 8px) for better visual spacing
                    // and to ensure the line covers the content even with minor padding.
                    //rtimg.paddingTop = `50px`;
                    rtimg.style.height = `${contentHeight}px`;
                    rtimg.style.width = `${(contentHeight/5)+(contentHeight/5)*(8/86)}px`;
                    let rtimgwidth = rtimg.offsetWidth;
                    //rtimg.style.marginRight = `-${(rtimgwidth*(3/(201.116)))}px`;
                    rtimg.style.marginRight = `${-(rtimgwidth*(3/(100.116)))}px`;
                    if(rtimg.scrollHeight < 100) {
                        console.log('if executing in rtimg adjustment from appender');
                        rtimg.style.marginRight = `${-(rtimgwidth*(3/(100.116))) + 1}px`;
                    }
                    console.log(`root image margin = -${(rtimgwidth*(3/(201.116)))}px`);
                    //console.log(`root image margin = -${(contentHeight*(2/700)) + ((contentHeight*(2/700))*0.5)}px`);
                    valinrt.style.borderTopWidth = `${(contentHeight*(0.8/50))-((contentHeight*(0.8/50))*0.3)}px`;
                } else {
                    console.log('Error: rtimg or valueinrt element not found within .rt parent.');
                }
                pntatcheck = parentrt.parentNode;
                
            }
            while (pntatcheck.closest('.sinp') != null) {
                const parent = pntatcheck.closest('.sinp');
                const opbrkel = directchildselector(parent,'sinopbrkel');
                const clbrkel = directchildselector(parent,'sinclbrkel');
                prnumconth = parent.querySelector('.sinnumcnt');
                if(opbrkel!== null && clbrkel !== null && prnumconth !== null){
                    fntsztoset = prnumconth.scrollHeight;
                    opbrkel.style.fontSize = `${fntsztoset}px`;
                    clbrkel.style.fontSize = `${fntsztoset}px`;
                    console.log('in sin appender:');
                    console.log(fntsztoset);
                }
                pntatcheck = parent.parentNode;

            }
            
        }
        function ce(){
            inputContainer.innerHTML='';
            currentinput = document.createElement('div');
            currentinput.className = 'parinput';
            currentinputchanger(currentinput);
            newparinpenvset(newdiv);
            inputContainer.appendChild(currentinput);
            res = document.getElementById('res');
            res.textContent = '';
        }
        /*function parsenormalinput(element){
            let expression = '';
            let inputelements = element.children;

            for(i = 0;i<inputelements.length;i++){
                let element = inputelements[i];
                if(!element.className === 'fraction'){
                    expression+=element.textContent;                    
                }else{
                    expression+=parsefrac(element);
                }
            }
            return expression;
        }

        function parsefrac(element){
            if(element.className === 'fraction'){
                    numerator =  element.querySelector('.numerator');
                    denominator = element.querySelector('.denominator');
                    console.log(numerator);
                    console.log(denominator);
                    parsednumerator = String(parsenormalinput(numerator));
                    parseddenominator = String(parsenormalinput(denominator));
                    fracres = String(eval(String(eval(parsednumerator))+'/'+String(eval(parseddenominator))));
                    return fracres;
                }else return '29';
        }

        function parseinputmain(){
            let expression = '';
            let inputelements = inputContainer.children;
            for(i = 0;i<inputelements.length;i++){
                let element = inputelements[i];
                if(!(element.className === 'fraction')){
                    expression+=element.textContent;                    
                }else{
                    expression+=parsefrac(element);
                }
            }console.log(expression);
            return expression;
        }*/
        
