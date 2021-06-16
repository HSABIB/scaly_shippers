import React, { useRef, useState } from "react"
import S3 from "react-aws-s3"

const Upload = () => {
    const fileInput = useRef()
    const [newFileName, setNewFileName] = useState("")  

    const handelChange = event => {
        setNewFileName(event.target.value)
    }

    const handelClick = event => {
        event.preventDefault()
        let file = fileInput.current.files[0]
        const config = {
            "bucketName" : "shifty-documents",
            "dirName" : "UKR",
            "region": "eu-west-3",
            "accessKeyId" : "AKIA4AFD4GNZUL6EWO3O",
            "secretAccessKey" : "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"
        }
        const ReactS3Client = new S3(config)
        ReactS3Client.uploadFile(file, newFileName)
        .then(response => {
            console.log(response)
            if ( response.status === 204 ) {
                // send to server 
                console.log(response.location)
            } else {
                console.log('error')
            }
        })
    }

    return (
        <>
            <form className="upload-steps" onSubmit={handelClick}>
                <label>
                    File name : 
                    <input type="text" onKeyUpCapture={handelChange} placeholder="new file name" />
                </label>
                <label>
                    Upload file : 
                    <input type="file" ref={fileInput} />
                </label>
                <br />
                <button type="submit">Upload</button>
            </form>
        </>
    )
}

export default Upload