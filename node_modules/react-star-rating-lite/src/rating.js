import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Stars from './stars';
class Rating extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectIndex: this.props.value ? parseInt(this.props.value) : 0,
      hoverIndex: this.props.value ? parseInt(this.props.value) : 0,
      weight: this.props.weight || '30',
      lockHover: this.props.readonly ? true : false,
      color: this.props.color || 'orange'
    }
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
  }
  // to find the span element by looking up
  getSpanElement(target){
    // bubble up untill you find the parent span element or the base node
  	while(target && target.tagName !== "SPAN")
    {
    	target = target.parentNode;
    }
    return target;
  }
  // to highlight rating on hover
	mouseOverHandler(e){
    // allow mouse hover when its allowed
  	if(!this.state.lockHover)
    {
      // get the rating value of the current mover over node
      var ratingValue = this.getDataIndexValue(e.target);
      if(ratingValue)
      {
        this.setState({
          hoverIndex : ratingValue
        });
      }
    }
  }
  // to get the index value of rating being clicked
  getDataIndexValue(target){
    var spanIndex;
    var spanElement = this.getSpanElement(target);
    if(spanElement)
    {
      spanIndex = spanElement.getAttribute('data-index');
      spanIndex =  spanIndex ? parseInt(spanIndex) : spanIndex;
    }
    return spanIndex;
  }
  // to capture user input and execute the user passed function
  onClickHandler(e){
  	if(!this.props.readonly)
    {
        var ratingValue = this.getDataIndexValue(e.target);
        if(ratingValue)
        {
          this.setState({
            hoverIndex: ratingValue,
            selectIndex: ratingValue
          });
          // execute the user onclick function if available
          if(typeof(this.props.onClick) === "function")
            this.props.onClick(ratingValue);
        }
     }
  }
  // when moving out of rating
  mouseLeaveHandler(){
  	if(!this.state.lockHover)
    {
      this.setState({
          hoverIndex: this.state.selectIndex
        })
     }
  }
  render(){
    return (
      <div className="react__star__rating__lite">
        <div
          onMouseOver={this.mouseOverHandler}
          onClick={this.onClickHandler}
          onMouseLeave={this.mouseLeaveHandler}>
          <Stars hoverIndex={this.state.hoverIndex} weight={this.state.weight} color={this.state.color}/>
        </div>
      </div>)
    }
}

Rating.propTypes = {
  value: PropTypes.string,
  weight: PropTypes.string,
  readonly: PropTypes.bool,
  color: PropTypes.string
};
export default Rating;
