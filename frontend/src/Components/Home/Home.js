import React from "react";
import Header from '../Header';
import './Home.css';

function Home() {
  return (
    <div className="Home">

      <Header title="FairnessLab"/>
      <h1>Don't just audit your decisions but their consequences</h1>
      <p>
        Welcome to the FairnessLab! This tool is intended to help you audit machine learning models.
        It takes a group fairness approach, meaning it audits a tool across socio-demographic groups.
        However, it is built to avoid some of the shortcomings of standard group fairness metrics.
        Specifically, it aims to help domain experts translate their knowledge into fairness metrics that uniquely fit the context in which the machine learning model is deployed.
        This sets it apart from existing tools for group fairness audits such as AIF360 or FairLearn.
        The FairnessLab is fit for both internal audits as well as external audits, but it is currently limited to auditing binary classifiers, so to models that are used to make binary decisions (e.g, whether an applicant will receive a loan or not).
        If your model is not a binary classifier, you might still be able to use this model if converting your data to a binary setting makes sense for your application or at least for its audit. <a href="/#/faq">You can read more about that in the FAQ.</a>
      </p>
      <h3>Who is this for?</h3>
      <p>
        The tool is meant to be accessible to people with limited technical knowledge. We highly encourage everyone to use this tool to audit publically accessible models.
        What you will for your own audit is mainly domain knowledge:
        You have to have a good understanding of the context in which the machine learning model is deployed to be able to define an appropriate way of measuring fairness in this context.
        The FairnessLab will guide you through this process of defining an appropriate fairness metric.
      </p>
      <h3>Want to see the FairnessLab in action?</h3>
      <p>
        You can find an audit of the well-known COMPAS dataset in the section <a href="/#/compas">COMPAS Case Study</a>.
        The dataset was published along with the ProPublica story <a href="https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing" target="_blank">"Machine Bias"</a> that started a debate about how to evaluate the fairness of machine learning models.
        When you follow our audit of COMPAS in the FairnessLab, you will see that there are more ways to evaluate the fairness of the predictions than discussed by ProPublica (which audited COMPAS) and Northpointe (the company that developed COMPAS).
        Importantly, instutional racism might imply that the consequences of the predictions should be evaluated differently than standard group fairness metrics do.
        Going through this case study should thus both give you new insights into the COMPAS case and a better understanding of what the FairnessLab is capable of.
      </p>
      <h3>Ready to get started?</h3>
      <p>
        In the navigation bar you can find the section <a href="/#/audit">audit</a>. Choose a dataset to explore or upload your own dataset and then follow the instructions to derive a fairness metric that fits the context of the dataset.
        You can then evaluate the model based on this metric.
      </p>
      <h3>Curious to learn more?</h3>
      <p>
        This tool has been built by a team of researchers at the Zurich University of Applied Sciences, the University of Zurich and the University of St. Gallen.
        You can learn more about us and our work <a href="https://fair-ai.ch" target="_blank">on our website</a>.
        The FairnessLab builds on our theoretical work on group fairness metrics: "Distributive Justice as the Foundational Premise of Fair ML: Unification, Extension, and Interpretation of Group Fairness Metrics"<a href="https://arxiv.org/abs/2206.02897" target="_blank">(available on arXiv)</a> and "A Justice-Based Framework for the Analysis of Algorithmic Fairness-Utility Trade-Offs" <a href="https://arxiv.org/abs/2206.02891" target="_blank">(available on arXiv)</a>.
      </p>
    </div>
  );
}

export default Home;