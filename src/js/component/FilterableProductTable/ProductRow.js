class ProductRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        //如果没有库存，名字显示为红色
        var name = this.props.product.stocked
            ? this.props.product.name
            : <span style={{color:'red'}}>{this.props.product.name}</span>;
         return(
             <tr>
                 <td>{name}</td>
                 <td>{this.props.product.price}</td>
             </tr>
         );
    }
}