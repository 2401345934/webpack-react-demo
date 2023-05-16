module.exports = ({ template_name }) => {
  return `
  function use${template_name}() {
    const [num, setNum] = useState(1)
  
    useMount(() => {})
  
    return [num, setNum]
  }
  
  export default use${template_name}
  `
}
