DocRoot = "";

//Ajile.EnableCloak(true);
//Ajile.EnableDebug(false);

window.onReady = function()
{
	var e = {};
	e.oncomplete = function(event)
	{
		com.mislabeled.io.ResourceLoader.GetInstance().removeListener("oncomplete",e);

		BrowserHistory.initialize();

		window.app = new com.mislabeled.application.program.APIViewer();

		var e = {};
		e.onLoad = function()
		{
			if (document.location.hash != '')
			{
				var className = document.location.hash.substring(1)
				app.UpdateClassInfo(className,true);
			}
		}
		app.addListener('onLoad',e);

		app.Run()
	}
	com.mislabeled.io.ResourceLoader.GetInstance().addListener("oncomplete",e);

	// Import statement must be final for Opera to work
	Import("com.mislabeled.application.program.APIViewer");
}