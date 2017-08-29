import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '/* add your jsx here */',
      output: '',
      err: ''
    };
  }

  update(e) {
    let code = e.target.value;
    try {
      this.setState({
        output: window.Babel
          .transform(code, { presets: ['es2015', 'react'] })
          .code,
        err: ''
      });
    } catch (err) {
      this.setState({ err: err.message });
    }
  }

  componentWillMount() {
    console.log('componentWillMount');
    const jsx = `const App = (props) => {
  var myStyle = {
    backgroundColor: '#000',
    height: 10
  }
  return (
    <div style={myStyle}>
      <a href="#"
        notrendered="x"
        onClick={update}>
        {/* this is a comment */}
        this is a text
        {i > 1 ? 'More than one' : 'one'}
        {i > 1 && 'More than one'}
      </a>
    </div>
  )
}`;
    this.setState({
      input: jsx,
      output: window.Babel
        .transform(jsx, { presets: ['es2015', 'react'] })
        .code
    });
  }

  render() {
    return (
      <div>
        <header>{this.state.err}</header>
        <div className="container">
          <textarea
            onChange={this.update.bind(this)}
            defaultValue={this.state.input} />
          <pre>
            {this.state.output}
          </pre>
        </div>
      </div>
    );
  }
};

export default App;