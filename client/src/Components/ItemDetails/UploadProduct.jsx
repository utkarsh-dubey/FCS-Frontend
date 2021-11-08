import React, {useState} from 'react';

const UploadProduct = () => {
    const [selectedFile, setSelectedFile] = useState();
	// const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		// setIsSelected(true);.
        console.log(event.target.files[0]);
	};
    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
			<div>
				{/* <button onClick={handleSubmission}>Submit</button> */}
			</div>
        </div>
    )
}

export default UploadProduct
