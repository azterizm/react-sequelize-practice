# UserInstance analysis
UserInstance is a wrapper for defining generic for User Model.
1. It needs Model for defining the model.
  1. Strict typing the model, first generic it requires is used to define
  what attributes (userAttributes) are going to be defined in the model.
  2. Second generic (userCreationAttributes) is what is going to be needed to
  create a instance.
2. It optionally (but essentially) extends same attributes what was defined
in the model so that after creating the instance, they can be accessed for.
3. At last, we manually define what instances we want to define in the model.
For example, validPassword instance function that validates encrypted password.
