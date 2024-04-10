import React, { FC } from "react"

interface ButtonProps {
    title: string
    inactive?: boolean
    onClickFunc: () => void
}

const Button: FC<ButtonProps> = ({title, inactive, onClickFunc}) => {
    return <button onClick={() => !inactive && onClickFunc()} style={{
        background: "white",
        color: (inactive) ? "grey": "black",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 10,
        marginLeft: 10,
        border: "1px black solid",
        cursor: inactive ? "default" : "pointer"
    }}>{title}</button>
}

export default Button;