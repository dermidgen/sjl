Namespace("com.mislabeled.ui.layout.point");

com.mislabeled.ui.layout.point.popup = Class.create();
com.mislabeled.ui.layout.point.popup.extend("div");
com.mislabeled.ui.layout.point.popup.inherits("com.mislabeled.EventDispatcher");

com.mislabeled.ui.layout.point.popup.prototype.initialize = function(point)
{
	this.pointDisplayX = point.displayX;
	this.pointDisplayY = point.displayY;

	this.setAttribute("mlType", "point-popup");

	this.pointX = point.x;
	this.pointY = point.y;

	this.container = point.container;

	this.pointSize = point.size;

	this.placementX = this.pointDisplayX + this.pointSize;
	this.placementY = this.pointDisplayY + this.pointSize;

	this.hName = point.hName;
	this.vName = point.vName;

	this.setPlacement = function()
	{
		this.pointDisplayX = point.displayX;
		this.pointDisplayY = point.displayY;

		this.placementX = this.pointDisplayX + this.pointSize;
		this.placementY = this.pointDisplayY + this.pointSize;
	}

	// Controls
	this.submitonclick = function()
	{
		var cont = new com.mislabeled.ui.layout.container();
		cont.SetLayout(com.mislabeled.ui.layout.point.control);
		cont.SetStyle({
			width: "150px",
			height: "150px",
			background: "yellow"
		});
		cont.setAttribute("Align", this.vName + "-" + this.hName);
		cont.SetLayout(com.mislabeled.ui.layout.point.control);
		this.container.appendChild(cont);
		cont.layoutControl.togglePoints();
		this.toggle();
	}
	this.submitonclickBind = this.submitonclick.bind(this);


	this.createDomElement = function()
	{
		var table = document.createElement("Table");
		var tbody = document.createElement("tbody");
		var rowWidth = document.createElement("tr");
		var rowHeight = document.createElement("tr");

		var widthNameCell1 = document.createElement("td");
		var widthNameCell2 = document.createElement("td");
		var widthNameText = document.createElement("input");
		widthNameText.type = "text";
		widthNameText.style.width = "25px";
		widthNameCell2.appendChild(widthNameText);
		widthNameCell1.innerHTML = "Width";

		this.widthTextbox = widthNameText;

		rowWidth.appendChild(widthNameCell1);
		rowWidth.appendChild(widthNameCell2);
		tbody.appendChild(rowWidth);

		var widthNameCell1 = document.createElement("td");
		var widthNameCell2 = document.createElement("td");
		var widthNameText = document.createElement("input");
		widthNameText.type = "text";
		widthNameText.style.width = "25px";
		widthNameCell2.appendChild(widthNameText);
		widthNameCell1.innerHTML = "Height";

		this.heightTextbox = widthNameText;

		rowHeight.appendChild(widthNameCell1);
		rowHeight.appendChild(widthNameCell2);
		tbody.appendChild(rowHeight);


		var submitCell1 = document.createElement("td");
		var submitCell2 = document.createElement("td");
		var submit = document.createElement("button");
		submit.innerHTML = "Done";

		submit.onclick = this.submitonclickBind;


		submitCell2.appendChild(submit);
		tbody.appendChild(submitCell1);
		tbody.appendChild(submitCell2);



		table.appendChild(tbody);
		this.appendChild(table);

	}

	////////////////////
	this.appearance = function()
	{
		with(this.style)
		{
			left = this.placementX + "px";
			top = this.placementY + "px";
			background = "maroon";
			position = "absolute";
			height = "100px";
			width = "150px";
			zIndex = "5";
			border = "1px solid white";
		}
	};

	this.show = function()
	{
		this.style.visibility = "visible";
	}

	this.hide = function()
	{
		this.style.visibility = "hidden";
	}

	this.createDomElement();
	this.appearance();
	this.container.appendChild(this);
}

com.mislabeled.ui.layout.point.popup.prototype.toggle = function()
{
	this.setPlacement();
	this.appearance();
	if(this.style.visibility == "visible")
	{
		this.style.visibility = "hidden";
	}
	else
	{
		this.style.visibility = "visible";
	}
}