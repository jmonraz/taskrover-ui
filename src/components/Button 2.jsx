// styles
import styles from './Button.module.css';

const Button = ({children, onClick, styleName}) => {

    const buttonStyle = styles[styleName] || styles['default-button'];
    return (
        <>
            <button onClick={onClick} className={buttonStyle} >{children}</button>
        </>
    );
};

export default Button;