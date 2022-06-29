import React,{Component} from 'react';
import PropTypes from 'prop-types';
class Star extends Component {
	constructor(props,context)
	{
		super(props,context);
		this.state = {
			starFilled:{
				'fill': this.props.color
			},
			starUnfilled:{
				'stroke':this.props.color,
			  'strokeWidth':'20px',
			  'fill':'transparent'
			}
    }
	}

	render(){
    var styleValue = this.props.index <= this.props.hoverIndex ? this.state.starFilled : this.state.starUnfilled;
		return (
      <span data-index={this.props.index} style={{'padding':'2px'}}>
        <svg id="star" viewBox="0 0 1024 1024" width={this.props.weight} >
          <title>Star</title>
          <path style={styleValue} d="M1024 397.050l-353.78-51.408-158.22-320.582-158.216 320.582-353.784 51.408 256 249.538-60.432 352.352 316.432-166.358 316.432 166.358-60.434-352.352 256.002-249.538z"></path>
        </svg>
      </span>
    )
  }
}

Star.propTypes = {
  hoverIndex: PropTypes.number,
  weight: PropTypes.string,
  color: PropTypes.string
};

export default Star;
