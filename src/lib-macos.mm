#include <napi.h>

#import <CoreFoundation/CoreFoundation.h>
#import <Foundation/Foundation.h>

Napi::Object SetDevAppAsDefaultProtocolClient(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  const std::string path = info[0].As<Napi::String>().Utf8Value();
  const std::string protocol = info[1].As<Napi::String>().Utf8Value();

  NSString *appProtocol =
      [NSString stringWithCString:protocol.c_str()
                         encoding:[NSString defaultCStringEncoding]];
  NSString *appPath =
      [NSString stringWithCString:path.c_str()
                         encoding:[NSString defaultCStringEncoding]];
  NSURL *inUrl = [NSURL fileURLWithPath:appPath];

  OSStatus registerStatus =
      LSRegisterURL((__bridge CFURLRef _Nonnull)(inUrl), true);

  NSString *bundleID =
      [NSString stringWithFormat:@"com.deeplink.%@", appProtocol];
  OSStatus setDefaultStatus = LSSetDefaultHandlerForURLScheme(
      (__bridge CFStringRef)appProtocol, (__bridge CFStringRef)bundleID);

  NSURL *url =
      [NSURL URLWithString:[NSString stringWithFormat:@"%@://", appProtocol]];
  CFArrayRef urlList =
      LSCopyApplicationURLsForURL((__bridge CFURLRef)url, kLSRolesAll);

  Napi::Object results = Napi::Object::New(env);

  return results;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "setDevAppAsDefaultProtocolClient"),
              Napi::Function::New(env, SetDevAppAsDefaultProtocolClient));
  return exports;
}

NODE_API_MODULE(handler, Init)
