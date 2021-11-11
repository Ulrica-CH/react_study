import React,{Component} from 'react';
import Hello from './components/Hello/Hello';
import Welcome from './components/Welcome/Welcome';
class App extends Component {
  render() {
    return (
      <div>
        <h2>Hello react-cli</h2>
        <Hello />
        <Welcome />
      </div>
    );
  }
}
export default App;
