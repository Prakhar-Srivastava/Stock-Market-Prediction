const gebi=id=>document.getElementById(id);
const r=ReactDOM.render;
const e=React.createElement;
let __DATA__=undefined
const post_sym=sym=>{
	return fetch('http://localhost:5000/predict/',{
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({'symbol':sym})
	})
}
const res=(props)=>(e('div',{"className": "results", "onClick": (event)=>{
	k()
	let s=gebi('search')
	let c=gebi('chart')
	ctx=c.getContext('2d')
	if(s.classList.length==1)
		s.classList.add('spotlight-minified')
	s.value=props.symbol
	post_sym(props.symbol).then(resp=>{resp.json().then(resp=>{
		__DATA__=resp
		__DATA__.X=JSON.parse(__DATA__.X)
		__DATA__.y=JSON.parse(__DATA__.y)
		__DATA__.pred=JSON.parse(__DATA__.pred)
		let predicted_value_plot={
			label: 'Predicted',
			data: __DATA__.pred,
			borderColor: 'rgb(75, 192, 192)',
			fill:false,
		  lineTension: 0.1
		  }
		  let plot_data={
			datasets:[predicted_value_plot]
		  }
		  let lineChart=new Chart(ctx,{
			type:'line',
			data:plot_data,
			options: {},
		  })
		console.log(__DATA__)
	})})
	
}},e('span',{"className":"symbol"},props.symbol),e('span',{"className":"name"},props.name)))
class Results extends React.Component{
	render(){
		let i=0
		return (e('div',{"className":"resultsContainer"},
		this.props.matches.map((elem)=>{
			//console.log(elem)
			return e(res,{"symbol":elem.symbol,"name":elem.name,"key":i++})
	})
	)
	)
	}
}
class Search extends React.Component{
	constructor(){
		super()
		this.state={"correct_matches":[]}
		//this.setState=this.setState.bind(this)
	}
	render(){
		let matches=[]
		const child=e('input',{
			type: 'text',className: 'spotlight',id: 'search', placeholder: 'Search',autoFocus:'true',
			onKeyUp: (ev)=>{
				let val=gebi('search').value;
				val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '')
				if(val && val!=' '){
				let regex= new RegExp('^'+val+'{1,3}','i')
				indian.forEach(e => {
					if(e.symbol.match(regex)||e.name.match(regex)){
						matches.push(e)
					}
				});
				this.setState({correct_matches:matches})
				//console.log(this.state.correct_matches)
				matches=[]
			}else
				this.setState({correct_matches:[]})
		}
		},null)
		//<i class="fa fa-times-circle" aria-hidden="true"></i>
		const resultFooter=e('div',{className:"results-info"},this.state.correct_matches.length+' results found',
		e('button',{onClick:(ev)=>{
			this.setState({correct_matches:[]})
		},className: 'close-result',title:'Close this search panel'},e('i',{'className': 'fa fa-times-circle', 'aria-hidden': "true",'style':{color:'red',}},null)))
		return (this.state.correct_matches.length>0?(e('div',{},child,e(Results,{"matches": this.state.correct_matches},null),resultFooter)):(e('div',{},child,e(Results,{"matches": this.state.correct_matches},null))))
	}
}
class Main extends React.Component{
	render(){
		console.log(loadjson)
		loadjson()
		return(e(Search)
	)
	}
}
const k=()=>{
	//let o=new Search()
	//o.setState({"current_matches":[]})
	r(e(Main),gebi('root'))
}
r(e(Main),gebi('root'))