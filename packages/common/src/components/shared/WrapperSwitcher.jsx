const WrapperSwitcher = ({ condition, wrapper1,wrapper2,children }) => (condition?wrapper1(children):wrapper2(children))

 export default WrapperSwitcher;