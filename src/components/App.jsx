
import React, {Component} from 'react';
import Section from './Section/section'; 
import FeedbackOptions from "./Widget/widget";
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export default class App extends Component {
	state = {
		good: 0,
		neutral: 0,
		bad: 0
	};

	countTotalFeedback = () => {
		const { good, neutral, bad } = this.state;
		const result = good + neutral + bad;
		return result;
	};

	countPositiveFeedbackPercentage = () => {
		const result = this.countTotalFeedback();
		const { good } = this.state;
		const percentage = (good * 100) / result;
		return Math.round(percentage);
	};

	onLeaveFeedback = (e) => {
		const name = e.target.name;
		this.setState((prevState) => ({
			[name]: prevState[name] + 1
		}));
	};
	render() {
		const { good, neutral, bad } = this.state;
		const total = this.countTotalFeedback();
		const positivePercentage = this.countPositiveFeedbackPercentage();

		const objKey = Object.keys(this.state);
		return (
      <div
        style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: 'green'
      }}>
				<Section title="Please leave feedback">
					<FeedbackOptions options={objKey} onLeaveFeedback={this.onLeaveFeedback} />
				</Section>

				{total === 0 ? (
					<Notification message="No feedback given" />
				) : (
					<Section title="Statistics">
						<Statistics
							good={good}
							neutral={neutral}
							bad={bad}
							total={total}
							positivePercentage={positivePercentage}
						/>
					</Section>
				)}
			</div>
		);
	}
}

