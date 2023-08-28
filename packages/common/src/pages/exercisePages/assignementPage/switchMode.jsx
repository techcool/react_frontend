const switchMode = async function() {
  const { attempts, submissionsCount, isThereEndOperation } = this.state

  if (submissionsCount === attempts - 1) {
    this.submitAnswers();
  } else if (submissionsCount < attempts - 1) {
    this.evaluateAnswers();
  }
  this.setState(
    {
      exerciseIndex: 0,
      questionIndex: 0,
    }
  )
  if(isThereEndOperation){
    setTimeout(() => {
      this.props.setShowExerciseView(false);
    }, 3000); 
  }
  this.props && this.props.history && this.props.history.goBack();
}
export default switchMode;