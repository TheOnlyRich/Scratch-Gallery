const fs = require('fs');
const path = require('path');
const directoryPath = 'C:\\Users\\chuan\\Desktop\\scratch log in\\data'; // Change this to your target directory
var final_list = [];
var file_num = 0;
fs.readdir(directoryPath, (err, files) => {
    file_num = files.length;
    if (err) {
        return console.error('Error reading directory:', err);
    }
    for(let i = 0; i < files.length; i++) {
        let file = files[i];
        let filePath = path.join(directoryPath, file);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return console.error('Error reading file:', err);
            }
            
            //listItem.textContent = `${file.name}:`;
                    //const content = document.createElement('pre'); // Preserve formatting
                    //content.textContent = e.target.result;
                    //listItem.appendChild(content);
                    var items = JSON.parse(data);
                    for (var item of items) {
                        final_list.push(item);
                    }
                    console.log(final_list.length);
                    
                    file_num--;

                    console.log(file_num);
                    if (file_num == 0) {
                        
                        try {                           
                            console.log('done');
                            // Convert JSON data to a string
                            const jsonString = JSON.stringify(final_list, null, 2); // Pretty-print with 2 spaces

                            // Create a Blob from the JSON string
                            const blob = new Blob([jsonString], { type: 'application/json' });
                            
                            // output to file
                            fs.writeFile(directoryPath+'\\page_all.json', jsonString, (err) => {
                                if (err) {
                                    console.error('Error writing JSON to file:', err);
                                } else {
                                    console.log('JSON data written to file');
                                }
                            });

                            // // Create a temporary anchor element
                            // const a = document.createElement('a');
                            // a.href = URL.createObjectURL(blob);
                            // a.download = `page_all.json`; // File name for download

                            // // Trigger the download
                            // a.click();

                            // // Clean up the object URL
                            // URL.revokeObjectURL(a.href);
                           
                        } catch (error) {
                            console.error('Error fetching or downloading JSON data:', error);
                        }
                    }
        });
    
    console.log('Files in directory:', files);
}});
