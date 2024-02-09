
const Link = (props) => {

    return(
        <a href={props.src} className={props.className}>{props.text}</a>
    )
}

export default Link;