require "json"
package = JSON.parse(File.read('package.json'))

Pod::Spec.new do |s|
  s.name             = package['name']
  s.version          = package['version']
  s.summary          = package['description']
  s.author           = package['author']
  s.requires_arc = true
  s.license      = 'MIT'
  s.homepage     = 'n/a'
  s.source       = {:git => "https://github.com/wkh237/react-native-fetch-blob", :tag => 'v0.10.6'}
  s.source_files = 'ios/**/*.{h,m}'
  s.platform     = :ios, "8.0"
  s.dependency 'React-Core'
end
