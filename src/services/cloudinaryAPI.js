import axios from 'axios'

const cloudinaryAPI = async (imageFile) => {
    const formData = new FormData()

    formData.append('file', imageFile)
    formData.append('upload_preset', 'chai_loop_upload')

    return await axios.post(
        'https://api.cloudinary.com/v1_1/mj2vyjqi/image/upload',
        formData
    )
}

export default cloudinaryAPI