window.addEventListener("DOMContentLoaded", function () {
   document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {

      // Get values from drop-downs
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;
   
      // Get and display quotes
      fetchQuotes(selectedTopic, selectedCount);	   
   });
});

// TODO: Modify to use Fetch API

async function fetchQuotes(topic, count) {
	let url = "https://wp.zybooks.com/quotes.php?topic=" + topic + "&count=" + count;
	let html = "<ol>";
	
	try {
		let response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		let data = await response.json();
		console.log(data)
		for (let c = 0; c < count; c++) {
			html += `<li>${data[c].quote} - ${data[c].source}</li>`;
		}
		html += "</ol>";
		console.log(html)
		document.querySelector("#quotes").innerHTML = html;
	} catch (err) {
		document.querySelector("#quotes").innerHTML = "Topic '" + topic + "' not found"
		console.log(err)
	}
	
 }
 