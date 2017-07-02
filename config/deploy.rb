lock '3.8.2'

set :application,    'management-console-api-mock'
set :repo_url,       'git@github.com:yivo/management-console-api-mock.git'
set :user,           'deploy'
set :deploy_via,     :remote_cache
set :format_options, truncate: false, command_output: true

# capistrano-rbenv
set :rbenv_root, '/usr/local/rbenv'

task 'npm' do
  on release_roles :app do
    within release_path do
      execute 'npm', 'install', '--production'
    end
  end
end

after 'deploy:updated', 'npm'
