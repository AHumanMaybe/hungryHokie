function StandardButton({ text="next >", handleClick }){

    return(
    <div className="flex font-bold w-32 h-8 rounded-lg items-center justify-center text-cw bg-prim hover:shadow hover:shadow-prim hover:opacity-80 cursor-pointer" onClick={handleClick}>
        {text}
    </div>)

}

export default StandardButton;