import React from 'react';
// import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Header from './Header';

class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
  }

  // componentDidMount = async () => {
  //   this.setState({ isLoading: true },
  //     async () => {
  //       const user = await getUser();
  //       this.setState({
  //         isLoading: false,
  //       });
  //     });
  // }

  render = () => {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <h1>Profile Edit Page</h1>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
