import React, { useState } from 'react'
import cloudinaryAPI from '../../services/cloudinaryAPI'

function CloudinaryTest() {
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')

    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0]

        if (!selectedImage) {
            return
        }

        setImage(selectedImage)

        try {
            const response = await cloudinaryAPI(selectedImage)

            console.log(response.data)
            setImageUrl(response.data.secure_url)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Cloudinary Test</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

            {image && (
                <p>
                    Selected: {image.name}
                </p>
            )}

            {imageUrl && (
                <div>
                    <h3>Uploaded Image</h3>

                    <img
                        src={imageUrl}
                        alt="Uploaded"
                        width="300"
                    />

                    <p>{imageUrl}</p>
                </div>
            )}
        </div>
    )
}

export default CloudinaryTest