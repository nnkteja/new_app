import React,{Component} from 'react';
import axios from 'axios';

class Main extends Component{
  constructor() {
    super();
    this.state = {
      data: []
    };

  }

  componentDidMount() {
    var that = this;
    console.log('resp')
    axios('http://localhost:3000/v1/meta/get_info', {
      method: "get",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json, text/plain, */*"
      },
      withCredentials: true,
      timeout: 30000
    }).then(function(resp) {
      console.log(resp['data']['response']['data']['contacts'])
      that.setState({data: resp['data']['response']['data']['contacts']})
    });
  }

  render() {
    const ContactsToRender = this.state.data.map((contact, index) => {
        return (
            <tr key={contact.contact_id}>
                <td>
                  <div className="checkbox">
                    <label><input type="checkbox" value=""></input></label>
                  </div>
                </td>
                <td>{contact['contact_name']}</td>
                <td>{contact['company_name']}</td>
                <td>{contact['email']}</td>
                <td>{contact['mobile']}</td>
                <td>{contact['gst_treatment']}</td>
                <td>{contact['outstanding_receivable_amount']}</td>
                <td>{contact['outstanding_payable_amount']}</td>
                
            </tr>
        );
    });

    return (
      <div>
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <div className="checkbox">
                    <label><input type="checkbox" value=""></input></label>
                  </div>
                </th>
                <th>NAME</th>
                <th>COMPANY NAME</th>
                <th>EMAIL</th>
                <th>WORK PHONE</th>
                <th>GST TREATMENT</th>
                <th>RECEIVABLES</th>
                <th>PAYABLES</th>
              </tr>
            </thead>
            <tbody>
              {ContactsToRender}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Main