import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CollaborationPanel = ({ judges, discussions, onSendMessage, onStartDiscussion }) => {
  const [activeTab, setActiveTab] = useState('judges');
  const [newMessage, setNewMessage] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const handleSendMessage = () => {
    if (newMessage?.trim() && selectedDiscussion) {
      onSendMessage(selectedDiscussion?.id, newMessage);
      setNewMessage('');
    }
  };

  const onlineJudges = judges?.filter(judge => judge?.status === 'online');
  const activeDiscussions = discussions?.filter(d => d?.status === 'active');

  return (
    <div className="glass-card h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Judge Collaboration</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">
              {onlineJudges?.length} online
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('judges')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activeTab === 'judges' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            Judges ({judges?.length})
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activeTab === 'discussions' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            Discussions ({activeDiscussions?.length})
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'judges' && (
          <div className="p-4 space-y-3 h-full overflow-y-auto">
            {judges?.map((judge) => (
              <div key={judge?.id} className="flex items-center space-x-3 p-3 hover:bg-muted/20 rounded-lg transition-colors duration-200">
                <div className="relative">
                  <Image
                    src={judge?.avatar}
                    alt={judge?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                    judge?.status === 'online' ? 'bg-success' : 
                    judge?.status === 'busy' ? 'bg-warning' : 'bg-muted'
                  }`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {judge?.name}
                    </p>
                    {judge?.isLead && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        Lead
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {judge?.expertise} • {judge?.reviewedCount} reviews
                  </p>
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageCircle"
                    onClick={() => onStartDiscussion(judge?.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Video"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className="flex h-full">
            {/* Discussion List */}
            <div className="w-1/3 border-r border-border">
              <div className="p-3 border-b border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onStartDiscussion()}
                  iconName="Plus"
                  iconPosition="left"
                  fullWidth
                >
                  New Discussion
                </Button>
              </div>
              
              <div className="overflow-y-auto">
                {discussions?.map((discussion) => (
                  <button
                    key={discussion?.id}
                    onClick={() => setSelectedDiscussion(discussion)}
                    className={`w-full p-3 text-left hover:bg-muted/20 border-b border-border transition-colors duration-200 ${
                      selectedDiscussion?.id === discussion?.id ? 'bg-primary/10' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {discussion?.title}
                      </h4>
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(discussion.lastMessage)?.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {discussion?.lastMessageText}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {discussion?.participants?.length} participants
                      </span>
                      {discussion?.unreadCount > 0 && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                          {discussion?.unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedDiscussion ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border">
                    <h3 className="text-sm font-semibold text-foreground">
                      {selectedDiscussion?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedDiscussion?.participants?.length} participants
                    </p>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedDiscussion?.messages?.map((message) => (
                      <div key={message?.id} className="flex items-start space-x-3">
                        <Image
                          src={message?.sender?.avatar}
                          alt={message?.sender?.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-foreground">
                              {message?.sender?.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.timestamp)?.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-foreground">
                            {message?.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e?.target?.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                      />
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSendMessage}
                        disabled={!newMessage?.trim()}
                        iconName="Send"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Select a Discussion
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a discussion to view messages and participate
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationPanel;