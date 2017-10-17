// https://lucasbassetti.com.br/react-simple-chatbot/#/docs/hello-world

import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

// Chat Theme via Styled Components

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#0a0a0a',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#e4e4e4',
  botFontColor: '#4a4a4a',
  userBubbleColor : '#2687e9',
  userFontColor: '#0a0a0a',
}

// Review component to provide a summary at the end of the chat

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age } = steps;

    this.setState({ name, gender, age });
  }

  render() {
    const { name, gender, age } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

// The Actual Form Component

class SimpleForm extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle={ 'Banana Phone' }
          steps = {
            [
              {
                id: '1',
                message: 'Hey, this is AlexBot!',
                trigger: '2'
              }, {
                id: '2',
                message: 'Trying to make sure you are real before Alex sends his contact card.',
                trigger: '3',
                delay: 3000
              }, {
                id: '3',
                message: 'Hope its cool if I ask a few questions...',
                trigger: '4',
                delay: 2500
              }, {
                id: '4',
                message: 'What is your name?',
                trigger: 'name'
              }, {
                id: 'name',
                user: true,
                trigger: '5'
              }, {
                id: '5',
                message: `Cool, {previousValue}. Thanks! Are you a guy or girl?`,
                trigger: 'gender'
              }, {
                id: 'gender',
                options: [
                  {
                    value: 'male',
                    label: 'Guy',
                    trigger: '6'
                  }, {
                    value: 'female',
                    label: 'Girl',
                    trigger: '6'
                  }
                ]
              }, {
                id: '6',
                message: 'How old are you?',
                trigger: 'age'
              }, {
                id: 'age',
                user: true,
                trigger: '7',
                validator: (value) => {
                  if (isNaN(value)) {
                    return 'just type a number, thanks!';
                  } else if (value < 0) {
                    return 'less than zero years old, whoa...';
                  } else if (value > 120) {
                    return `${value}? yeah right!`;
                  }

                  return true;
                }
              }, {
                id: '7',
                message: 'Great! Check out your summary',
                trigger: 'review'
              }, {
                id: 'review',
                component: <Review/>,
                asMessage: true,
                trigger: 'update'
              }, {
                id: 'update',
                message: 'Did I mess anything up?',
                trigger: 'update-question'
              }, {
                id: 'update-question',
                options: [
                  {
                    value: 'yes',
                    label: 'Yes',
                    trigger: 'update-yes'
                  }, {
                    value: 'no',
                    label: 'No',
                    trigger: '8'
                  }
                ]
              }, {
                id: 'update-yes',
                message: 'What would you like to change?',
                trigger: 'update-fields'
              }, {
                id: 'update-fields',
                options: [
                  {
                    value: 'name',
                    label: 'Name',
                    trigger: 'update-name'
                  }, {
                    value: 'gender',
                    label: 'Gender',
                    trigger: 'update-gender'
                  }, {
                    value: 'age',
                    label: 'Age',
                    trigger: 'update-age'
                  }
                ]
              }, {
                id: 'update-name',
                update: 'name',
                trigger: '7'
              }, {
                id: 'update-gender',
                update: 'gender',
                trigger: '7'
              }, {
                id: 'update-age',
                update: 'age',
                trigger: '7'
              }, {
                id: '8',
                message: 'Thanks! Your info was submitted successfully!',
                trigger: 'end-message'
              }, {
                id: 'end-message',
                message: 'You should get a text from Alex soon.',
                end: true
              }
            ]
          }
        />
      </ThemeProvider>
    );
  }
}

export default SimpleForm;