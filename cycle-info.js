import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';

const t = window.TrelloPowerUp.iframe();

class Info extends Component {
  state = {
    taskForceLead: null,
    cycleEnds: null,
    cycleEnds: null,
    init: null
  };

  componentDidMount() {
    t.get('board', 'shared').then(data => {
      this.setState({
        taskForceLead: data.taskForceLead,
        cycleEnds: data.cycleEnds,
        cycleStarts: data.cycleStarts,
        init: true
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.init && (
          <div>
            <Formik
              initialValues={{
                cycleEnds: this.state.cycleEnds,
                cycleStarts: this.state.cycleStarts,
                taskForceLead: this.state.taskForceLead
              }}
              onSubmit={(values, { setSubmitting }) => {
                t.set('board', 'shared', {
                  cycleEnds: values.cycleEnds,
                  cycleStarts: values.cycleStarts,
                  taskForceLead: values.taskForceLead
                });

                setSubmitting(false);
              }}
              render={({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label>Task force lead</label>
                    <Field
                      className="form-control form-control-sm"
                      type="text"
                      name="taskForceLead"
                    />
                    <small className="form-text text-muted">
                      The name of the assigned task force lead
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Cycle start date</label>
                    <Field
                      className="form-control form-control-sm"
                      type="date"
                      name="cycleStarts"
                    />
                    <small className="form-text text-muted">
                      When is the cycle beginning?
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Cycle end date</label>
                    <Field
                      className="form-control form-control-sm"
                      type="date"
                      name="cycleEnds"
                    />
                    <small className="form-text text-muted">
                      When in the cycle ending?
                    </small>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Info />, document.getElementById('root'));
