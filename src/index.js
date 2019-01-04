import React from 'react';
import ReactDOM  from 'react-dom';
import PropTypes from 'prop-types';
import styles from './index.module.css';
// import CreditCard from './Components/CreditCard/CreditCard';

/**
 * LESSON LEARNED:
 * PAY ATTENTION TO HOW STYLING IS PASSED DOWN INTO THE MAIN 
 * COMPONENET THROUGH className as a prop.  this took much time to figure
 * out - but we did figure it out -- 
 * 
 * We also used the <address /> html 5 which works with the<br/> label
 * to break it up into lines and also note how it has a user-agent
 * style of being italisized
 * 
 * GOOD JOB on making the AddresLabel generic from onset - this allowed 
 * us to reuse the componenet for both the sender and the receipient.
 * 
 * GOOD JOB using PropTypes - we know this topic well and think
 * it will be a staple feature in out React programming.
 * 
 * GOOD JOB - no errors or warning in the console and we managed to make
 * the envelopel look very similar to the example on page 84.
 * 
 * WE MUST WORK ON OUR CSS POSITIONING !!!!!
 */


const person1 = {
  name: "Sender",
  address: "1234 Success Avenue #777",
  city: "Boston",
  state: "Massachusettes",
  zip: 33139
}
const person2 = {
  name: "Receiver",
  address: "9876 E 96th Avenue",
  city: "NY",
  state: "New York",
  zip: 11029
}

const client = {
  name: "James Lkhads",
  expiration: "2012-06-03",
  cardNumber: 1234567898764321,
  bankName: "Wells Farggo"
}

const posterDetails = {
  image: "./react-logo.png",
  title: "React",
  text: "The best thing since sliced bread!"
}

const incomingEmailData = {
  sender: "Elon Musk",
  subject: "Request for Expertise",
  date: "January 1",
  message: "We have heard that you are an amazing front-end developer in the field of React/Redux and would love to extend an offer to you!"
}


const Stamp = ({ className }) => {
  return (
    <div className={className}>
      <p>STAMP</p>
    </div>
  );
};


const AddressLabel = ({ person , className}) => {
  const {name, address, city, state, zip} = person;
  return (
    <address className={className}>
      Mr. {name}<br />
      {address}<br />
      {city}, {state} {zip}<br />
    </address>
  );
};
AddressLabel.propTypes = {
  person: PropTypes.shape({
            name: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            zip: PropTypes.number.isRequired,
          }).isRequired
};


const CreditCard = ({ cardInfo, className }) => {
  const { name, expiration, cardNumber, bankName } = cardInfo;

 //HELPER FUNCTION CREATED TO PROPERLY STYLE THE CARD NUMBERS1
  const cardNumberSplitter = (cardNumber) => {
    let changedArray = cardNumber.toString().split("");
    console.log(changedArray)
      let fill = [];
      let counter = 4;
  
      while (counter > 0) {
        for (let i = 0; i < 4; i++) {
          if (i < 4) {
            fill.push(changedArray.shift());
          }
        }
        fill.push(" ")
        counter--
      }
    return fill.join("");
  }
  return (
    <div className={className}>
      <div className={styles.bankTitle}>
        {bankName}<br />
      </div>
      <div className={styles.accountNumber}>
        {cardNumberSplitter(cardNumber)}<br />
        {expiration} <br />
      </div>
      <div className={styles.cardio}>
        {name}<br />
      </div>
    </div>
  );
};
CreditCard.propTypes = {
  cardInfo: PropTypes.shape({
                name: PropTypes.string.isRequired,
                expiration: PropTypes.string.isRequired,
                cardNumber: PropTypes.number.isRequired,
                bankName: PropTypes.string.isRequired,
              }).isRequired
}


const Poster = ({ posterProperties, className }) => {
  const { image, title, text } = posterProperties;
  console.log(image);
  return (
    <div className={styles.posterDefault_setting}>
      <div >
        <img src={require('./react-logo.png')} alt="React.js Logo" className={styles.logo}/>
        {/**Above is for one and done import logo from './logo.jpeg'; // with import ..THAN >> <img src={logo} />*/}
      </div>
      <div className={styles.titleStyle}>
        <p>
        <span>{title[0].toUpperCase()}</span>{title.slice(1,-1).toLowerCase()}<span>{title[title.length-1].toUpperCase()}</span> 
        </p>
      </div>
      <div>
        <p className={styles.posterText}>{text}</p>
      </div>

    </div>
  );
};
Poster.propTypes = {
  posterProperties: PropTypes.shape({
                      image: PropTypes.string.isRequired,
                      title: PropTypes.string.isRequired,
                      text: PropTypes.string.isRequired,
                    }).isRequired
}

const Email = ({ data }) => {
  const { sender, subject, date, message } = data;
  return (
    <div className={styles.emailCard}>
      <span className={styles.input}>
        <input type="checkbox" name="emailSelect"  />
      </span>
      
      <div className={styles.emailbody}>
        <div className={styles.emailtopLayer}>
          <span className={styles.emailSender} >{sender}</span>
          <span className={styles.emailsubject}>{subject}</span>
          <span className={styles.emailDate}>{date}</span>
        </div>
        <div className={styles.emailBottomLayer}>
          {message}
        </div>
      </div>
    </div>

  );
};
Email.propTypes = {
  data: PropTypes.object.isRequired,
}




const Envelope = ({toPerson, fromPerson}) => {
  return (
    <div className={styles.page}>
      <div className={styles.envelope}>
       <AddressLabel className={styles.sender_label} person={toPerson}/>
       <Stamp className={styles.stamp}/>
       <AddressLabel className={styles.the_receiver_label} person={fromPerson}/>
      </div>
      <div>
        <CreditCard className={styles.creditCard} cardInfo={client}/>
      </div>
      <div>
        <Poster posterProperties={posterDetails} className={styles.poster}/>
      </div>
      <div>
        <Email data={incomingEmailData} classname={styles.email}/>
      </div>
      
    </div>


  );
};



ReactDOM.render(
  <Envelope toPerson={person1} fromPerson={person2}/>, 
  document.getElementById('root')
);

