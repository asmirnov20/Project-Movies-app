import './Button.scss'

const Button = (props) => {
    return (
        <button
            className={`btn ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export const OutlineButton = (props) => {
    return (
        <Button
            className={`btn-outline ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    )
}

export default Button