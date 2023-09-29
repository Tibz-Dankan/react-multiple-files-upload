import { useState, ChangeEvent, FormEvent } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [images, setImages] = useState<any>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("files", event.target.files);
    setImages(event.target.files);
    setSelectedFile(file || null);
  };

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NTk4NTY3OCwiZXhwIjoxNjk1OTkyODc4fQ.qE_uaKBEXTZeqmwEBf4dtERJjTEN2UhcgOi8ZFIsjBE";

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (images[0]) {
      console.log("uploading multiple images");
      const formData = new FormData();

      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]);
      }

      console.log("formData", formData);

      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/products/validate-product-images",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("response");
        console.log(response);
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h2>Upload a File</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif, .pdf" // Specify allowed file types
          multiple
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      {selectedFile && (
        <div>
          <h3>Selected File:</h3>
          <p>Name: {selectedFile.name}</p>
          <p>Type: {selectedFile.type}</p>
          <p>Size: {selectedFile.size} bytes</p>
        </div>
      )}
    </div>
  );
}

export default App;
