require 'rails_helper'
RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
    it "is valid with a content" do
    message = build(:message, image: "")
    expect(message).to be_valid
  end
    it "is valid with a image"do
      message = build(:message, content: "")
      expect(message).to be_valid
    end
    it "is valid with a content, image" do
      message = build(:message)
      expect(message).to be_valid
    end
  end

  context 'can not save' do
    it "is invalid without a content, image" do
    message = build(:message, content: "", image: "")
    message.valid?
    expect(message.errors[:content]).to include("を入力してください")
    end
    it "is invalid without a user_id" do
      message = build(:message, group_id: "")
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end
    it "is invalid without a user_id" do
      message = build(:message, user_id: "")
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
  end
 end
end