import contest_banner from "common/src/images/contest_banner.svg";
import list_icon from "common/src/images/list_circle_blue.svg";
import React from "react";
import {
  Card,
  Col,
  Container,
  Row
} from "react-bootstrap";

class Shoutout extends React.Component {
  render() {
    return (
      <Container className="contest px-4 py-5 bg-white main-section top-zero">
        <Row>
          <Col xs={ 12 } md="8">
            <h2 className="contest-heading mb-4">The Shout-Out Contest</h2>
            <div className="contest-banner mb-5">
              <img src={ contest_banner } />
            </div>
            <div className="mb-5">
              <h4>Prompt</h4>
              <p>
                Write a rap or poem about your take on a story from this week.
                How does it relate to you, your community, and the world at
                large?
              </p>
            </div>
            <div className="mb-4">
              <h4>How to enter:</h4>
              <p>
                Teachers, parents and guardians may email submissions to
                contest@flocabulary.com using the following format:*
              </p>
              <div className="mb-4">
                <p className="mb-4">
                  <strong>Subject Line:</strong> Week in Rap OR Week in Rap
                  Junior (Pick one!)
                </p>
                <ul className="list-unstyled">
                  <li>
                    <img src={ list_icon } className="pr-2" />
                    Your full name
                  </li>
                  <li>
                    <img src={ list_icon } className="pr-2" />
                    The full name of your school (include pronunciation)
                  </li>
                  <li>
                    <img src={ list_icon } className="pr-2" /> The town / city and
                    state where your school is located
                  </li>
                </ul>
              </div>

              <p className="mb-4">
                Either paste in or attach files of your students’ work.
                Shout-outs are school-specific, not class-specific, so if you’re
                submitting for more than one class, please submit all entries in
                one email.
              </p>
              <p>
                <b>*Note:</b> Submissions that deviate from this format will not
                be considered.
              </p>
            </div>
            <div className="mb-4">
              <h4>How it works?</h4>
              <p>
                Every Thursday evening, we’ll notify one lucky school that it
                has won the Shout-Out Contest! You’ll then have until the
                following Wednesday to submit a video or photo* to be included
                in either the Week in Rap or Week in Rap Junior videos that week
                during the Shout-Out segment.
              </p>
              <div className="mb-4">
                <p className="mt-4">
                  <b>Note:</b> Any videos or photos submitted must be
                  horizontal. We reserve the right to disqualify submissions at
                  our discretion.
                </p>
              </div>
              <p>
                <strong>A little fine print:</strong> You must be 18 years or
                older to enter the contest. Teachers, parents and guardians can
                submit on behalf of their students and children, and can submit
                as many times as they'd like. By submitting a photo or video
                that features any students, teachers are agreeing that they’ve
                obtained parental consent to have the likeness of their child
                posted on the internet in a way that’s accessible by the public.
                By entering the contest, you agree to comply with the Official
                Rules.
              </p>
            </div>
          </Col>
          <Col xs={ 12 } md="4">
            <Card className="mb-5">
              <div className="bg-light-blue py-2 px-4">
                <h5>Categories</h5>
              </div>
              <div className="px-4 py-3">
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between">
                    <span>Writing Academy</span>
                    <span>23</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Current Event Lessons</span>
                    <span>23</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Graphic Organizer</span>
                    <span>23</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Adwords Campaign</span>
                    <span>23</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Language Arts Lessons</span>
                    <span>23</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Social Studies Lessons</span>
                    <span>23</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Science Lesson</span>
                    <span>23</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Math Lessons</span>
                    <span>23</span>
                  </li>
                </ul>
              </div>
            </Card>
            <Card>
              <div className="bg-light-blue py-2 px-4">
                <h5>Tags</h5>
              </div>
              <div className="px-4 py-3">
                <ul className="list-unstyled tags">
                  <li className="">
                    <span>Blog</span>
                  </li>
                  <li className="">
                    <span>Corporate</span>
                  </li>
                  <li className="">
                    <span>Popular</span>
                  </li>
                  <li className="">
                    <span>SEO</span>
                  </li>
                  <li className="">
                    <span>Online Marketing</span>
                  </li>
                  <li className="">
                    <span>PPC</span>
                  </li>
                  <li className="">
                    <span>Business</span>
                  </li>
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Shoutout;
