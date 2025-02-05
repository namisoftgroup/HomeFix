export const handleChange = (e,setFormData) => {
    setFormData((prv) => ({
        ...prv,
        [e.target.name]: e.target.value
    }))
}