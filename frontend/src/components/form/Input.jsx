function Input({
    type,
    text,
    styleLabel,
    styleInput,
    name,
    placeholder,
    handleOnChange,
    value,
    isRequired,
    multiple,
}) {
    return (
        <>
            <label htmlFor={name} className={styleLabel}>{text}</label>
            <input
                className={styleInput}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                {...(multiple ? { multiple } : '')}
                required={isRequired}
            />
        </>
    )
}

export default Input