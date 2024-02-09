import Image from 'react-bootstrap/Image';
const Logo = ({ src, alt, className}) => {
    return(
        <Image 
        src= {src} 
        alt= {alt}
        className= {className}
        />
    )
}

export default Logo;