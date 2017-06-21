class TemplateLoader {
    constructor(element, template, data){
        if(typeof element === 'string'){
            this.el = document.getElementById(element);
        } else {
            this.el = element;
        }

        this.templateName = template;
        this.data = data || null;
    }

    create(data){
        this.data = data || this.data;

        let request = new XMLHttpRequest();
        request.open('get', 'templates/' + this.templateName + '.handlebars', true);

        request.onreadystatechange = function(){
            if (request.readyState === 4 && request.status === 200){
                //Compile HB template, add data (if defined) and place in parent element.
                let compiled = Handlebars.compile(request.response);
                this.el.innerHTML = compiled(this.data);
            }
        };

        // Send request.
        request.send();
    }
}


const LoadTemplate = function(element, template, data){
    // Check if parenet element is defined as string or object.
    if(typeof element === 'string'){
        this.el = document.getElementById(element);
    } else {
        this.el = element;
    }

    // Store template name and data.
    this.templateName = template;
    this.data = data || null;

    // You can change this to path of your template folder.
    this.folderPath = 'templates/';
};

LoadTemplate.prototype.create = function(callback){
    let req = new XMLHttpRequest();
    let that = this;

    // Define parameters for request.
    req.open('get', this.folderPath + this.templateName + '.handlebars', true);

    // Wait for request to complete.
    req.onreadystatechange = function(){
        if (req.readyState === 4 && req.status === 200){
            //Compile HB template, add data (if defined) and place in parent element.
            let compiled = Handlebars.compile(req.response);
            that.el.innerHTML = compiled(that.data);

            // Execute callback function
            callback();
        }
    };

    // Send request.
    req.send();
};

/*
LoadTemplate.prototype.createAndWait = function(callback){
    let req = new XMLHttpRequest();
    let that = this;

    // Define parameters for request.
    req.open('get', this.folderPath + this.templateName + '.handlebars', true);

    // Wait for request to complete.
    req.onreadystatechange = function(){
        if (req.readyState === 4 && req.status === 200){
            //Compile HB template, but wait..
            let compiled = Handlebars.compile(req.response);

            // Execute callback function and parse variables.
            callback(compiled, that.el);
        }
    };

    // Send request.
    req.send();
};
*/