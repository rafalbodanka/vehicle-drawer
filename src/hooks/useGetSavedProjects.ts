const useGetSavedProjects = () => {
    const savedProjects = localStorage.getItem("savedProjects")
    if (savedProjects) return JSON.parse(savedProjects)
}

export default useGetSavedProjects