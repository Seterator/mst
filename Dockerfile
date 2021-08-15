FROM mcr.microsoft.com/dotnet/sdk:5.0 as publish
RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get install -y nodejs g++ make python
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish --no-restore -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
EXPOSE 80
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mst.dll"]