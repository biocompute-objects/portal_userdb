import { useDispatch } from "react-redux";
import { updateBco } from "../slices/bcoSlice";


export const handleFileUpload = (event) => {
  const dispatch = useDispatch()
  const file = event.target.files[0];
  const reader = new global.FileReader();
      
  reader.onload = (event) => {
    const fileContent = JSON.parse(event.target.result);
    console.log(fileContent)
    dispatch(updateBco(fileContent))
  };
      
  reader.readAsText(file);
};

export const handleDownloadClick = (jsonData) => {
  const name = jsonData.provenance_domain.name
  const blob = new global.Blob([JSON.stringify(jsonData, null,2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = global.document.createElement("a");
  a.href = url;
  a.download = `${name}.json`;
  a.click();

  URL.revokeObjectURL(url);
  // handle URL
};
